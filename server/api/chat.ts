// Orchestrator: deterministic analytics -> local AI summarization -> structured JSON response
import express from "express";
import fs from "fs";
import path from "path";
import AnalyticsEngine from "../lib/AnalyticsEngine";
import LocalAI from "../lib/LocalAI";
import { addMemory, getMemory, setCache, getCache, recordMathLatency, recordAILatency } from "../memory";

const router = express.Router();

const ANALYTICS_PATH = path.join(__dirname, "../data/analytics.json");
const localAI = new LocalAI({ baseUrl: 'http://localhost:11434/v1' });

function detectIntent(text: string) {
  const t = text.trim();
  if (t.startsWith("/")) {
    const cmd = t.split(/\s+/)[0].slice(1).toLowerCase();
    if (['chart', 'analyze', 'predict', 'forecast'].includes(cmd)) return cmd;
    return 'command';
  }
  const lowered = t.toLowerCase();
  if (lowered.includes('chart') || lowered.includes('graph') || lowered.includes('plot')) return 'chart';
  if (lowered.includes('predict') || lowered.includes('forecast')) return 'predict';
  if (lowered.includes('trend') || lowered.includes('growth') || lowered.includes('analyze')) return 'analyze';
  return 'chat';
}

router.post('/', async (req, res) => {
  try {
    let messages = req.body.messages;
    let userMessage = req.body.message;
    if (!messages && userMessage) messages = [{ role: 'user', content: userMessage }];
    if (!messages || !Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'Missing or invalid messages' });

    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUser || !lastUser.content) return res.status(400).json({ error: 'No user message' });
    const userQuery = lastUser.content;

    const intent = detectIntent(userQuery);

    // measure latency start
    const start = process.hrtime();

    // quick cache key
    const cacheKey = `analytics:${intent}:${userQuery}`;
    const cached = getCache(cacheKey);
    if (cached) {
      const elapsed = process.hrtime(start);
      const latencyMs = Math.round((elapsed[0] * 1e3) + (elapsed[1] / 1e6));
      return res.json({ ...cached, meta: { cached: true, ts: new Date().toISOString(), latency: `${latencyMs}ms` } });
    }

    // Load analytics dataset (source of truth)
    if (!fs.existsSync(ANALYTICS_PATH)) {
      return res.status(500).json({ error: 'Analytics dataset missing', code: 'INSUFFICIENT_DATA' });
    }
    const raw = fs.readFileSync(ANALYTICS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const metrics = parsed.metrics || [];
    const engine = new AnalyticsEngine(metrics);

    // determine which metric user likely wants
    let metricKey: string = 'views';
    const q = userQuery.toLowerCase();
    if (q.includes('engage') || q.includes('engagement')) metricKey = 'engagement';
    else if (q.includes('time') || q.includes('complete') || q.includes('project')) metricKey = 'completion_time';

    const mathStart = process.hrtime();
    const aggregates = engine.getAggregates('metric');
    const trends = engine.getTrends('metric');
    const ma = engine.getMovingAverage(3, 'metric');
    const z = engine.getZScores('metric');
    const forecast = engine.getForecast(3, 'metric');
    const mathElapsed = process.hrtime(mathStart);
    const mathMs = Math.round((mathElapsed[0] * 1e3) + (mathElapsed[1] / 1e6));
    try { recordMathLatency(mathMs); } catch (e) { /* no-op */ }

    // build chartSpec using engine helper
    const chartSpec = engine.produceChartSpec(metricKey);

    // If selected metric has no data, return structured error
    if (!chartSpec.data || chartSpec.data.length === 0) {
      return res.status(422).json({ error: 'No data for selected metric', code: 'INSUFFICIENT_DATA' });
    }

    // Call Local AI to turn stats into human insight (optional)
    const statsForAI = { aggregates, trends, movingAverage: ma, zscores: z, selected: metricKey };
    const forecastForAI = forecast;
    let aiResp;
    try {
      const aiStart = process.hrtime();
      aiResp = await localAI.summarize({ intent, stats: statsForAI, forecast: forecastForAI });
      const aiElapsed = process.hrtime(aiStart);
      const aiMs = Math.round((aiElapsed[0] * 1e3) + (aiElapsed[1] / 1e6));
      try { recordAILatency(aiMs); } catch (e) { /* no-op */ }
    } catch (e) {
      aiResp = { success: false, text: `Deterministic results available for ${metricKey}.` };
    }

    const insights = [ aiResp.text ];
    const confidence = aiResp.success ? 0.9 : 0.65;

    const elapsed = process.hrtime(start);
    const latencyMs = Math.round((elapsed[0] * 1e3) + (elapsed[1] / 1e6));

    const response = {
      intent,
      chartSpec: { type: chartSpec.type, data: chartSpec.data, axis: chartSpec.axis },
      insights,
      forecast: forecastForAI[metricKey] || { next: [], method: 'linear_regression' },
      confidence,
      meta: {
        timestamp: new Date().toISOString(),
        source: 'server/data/analytics.json',
        latency: `${latencyMs}ms`
      }
    };

    // cache and memory
    setCache(cacheKey, response);
    addMemory({ role: 'user', content: userQuery, timestamp: new Date() });
    addMemory({ role: 'assistant', content: insights.join('\n'), timestamp: new Date() });

    res.json(response);
  } catch (err) {
    console.error('[chat] Orchestrator error', err);
    // Distinguish parse problems vs generic failures
    const code = (err && err.code === 'PARSE_FAILURE') ? 'PARSE_FAILURE' : 'INTERNAL_ERROR';
    res.status(500).json({ error: 'Failed to process request', code });
  }
});

export default router;
