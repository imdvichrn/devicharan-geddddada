// Orchestrator: deterministic analytics -> local AI summarization -> structured JSON response
import express from "express";
import fs from "fs";
import path from "path";
import AnalyticsEngine from "../lib/AnalyticsEngine";
import LocalAI from "../lib/LocalAI";
import ContentParser from "../lib/ContentParser";
import { addMemory, getMemory, setCache, getCache, recordMathLatency, recordAILatency } from "../memory";

const router = express.Router();

const ANALYTICS_PATH = path.join(__dirname, "../data/analytics.json");
const localAI = new LocalAI({ baseUrl: 'http://localhost:11434/v1' });

function detectIntent(text: string) {
  const t = text.trim();
  if (t.startsWith("/")) {
    const cmd = t.split(/\s+/)[0].slice(1).toLowerCase();
    if (['chart', 'analyze', 'predict', 'forecast', 'projects', 'about', 'social', 'contact', 'links'].includes(cmd)) return cmd;
    return 'command';
  }
  const lowered = t.toLowerCase();
  if (lowered.includes('chart') || lowered.includes('graph') || lowered.includes('plot')) return 'chart';
  if (lowered.includes('predict') || lowered.includes('forecast')) return 'predict';
  if (lowered.includes('trend') || lowered.includes('growth') || lowered.includes('analyze')) return 'analyze';
  if (lowered.includes('social') || lowered.includes('instagram') || lowered.includes('linkedin') || lowered.includes('github') || lowered.includes('contact') || lowered.includes('links')) return 'social';
  if (lowered.includes('project') || lowered.includes('projects')) return 'projects';
  if (lowered.includes('about') || lowered.includes('bio')) return 'about';
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

    // If intent was projects/about/social, short-circuit with deterministic content
    if (intent === 'social') {
      const links = ContentParser.getSocialLinks();
      if (!links || links.length === 0) return res.status(422).json({ error: 'No social links found', code: 'PARSE_FAILURE' });
      const core = ContentParser.getCoreIdentity();
      const elapsed2 = process.hrtime(start);
      const latencyMs2 = Math.round((elapsed2[0] * 1e3) + (elapsed2[1] / 1e6));
      const resp = {
        intent: 'social',
        chartSpec: null,
        insights: [`Found ${links.length} social links.`],
        forecast: {},
        confidence: 1,
        data: { links },
        meta: { coreIdentity: core, timestamp: new Date().toISOString(), latency: `${latencyMs2}ms` }
      };
      setCache(cacheKey, resp);
      addMemory({ role: 'assistant', content: JSON.stringify(resp.data), timestamp: new Date() });
      return res.json(resp);
    }

    if (intent === 'projects') {
      const projects = ContentParser.getProjects();
      if (!projects || projects.length === 0) return res.status(422).json({ error: 'No projects found', code: 'PARSE_FAILURE' });
      const core = ContentParser.getCoreIdentity();
      const elapsed2 = process.hrtime(start);
      const latencyMs2 = Math.round((elapsed2[0] * 1e3) + (elapsed2[1] / 1e6));
      const resp = {
        intent: 'projects',
        chartSpec: null,
        insights: [`Returning ${projects.length} projects.`],
        forecast: {},
        confidence: 1,
        data: { projects },
        meta: { coreIdentity: core, timestamp: new Date().toISOString(), latency: `${latencyMs2}ms` }
      };
      setCache(cacheKey, resp);
      addMemory({ role: 'assistant', content: `projects:${projects.length}`, timestamp: new Date() });
      return res.json(resp);
    }

    if (intent === 'about') {
      const about = ContentParser.getSection('about');
      if (!about) return res.status(422).json({ error: 'No about section found', code: 'PARSE_FAILURE' });
      const core = ContentParser.getCoreIdentity();
      const elapsed2 = process.hrtime(start);
      const latencyMs2 = Math.round((elapsed2[0] * 1e3) + (elapsed2[1] / 1e6));
      const resp = {
        intent: 'about',
        chartSpec: null,
        insights: ['Returning about section.'],
        forecast: {},
        confidence: 1,
        data: { about },
        meta: { coreIdentity: core, timestamp: new Date().toISOString(), latency: `${latencyMs2}ms` }
      };
      setCache(cacheKey, resp);
      addMemory({ role: 'assistant', content: JSON.stringify(about), timestamp: new Date() });
      return res.json(resp);
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
