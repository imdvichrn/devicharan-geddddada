// Use global fetch when available (Node 18+). Do not import node-fetch to remain offline-friendly.


export type SummarizeInput = { intent: string; stats: any; forecast: any };

export class LocalAI {
  model: string;
  baseUrl: string;
  timeoutMs: number;
  constructor(opts?: { model?: string; baseUrl?: string; timeoutMs?: number }) {
    this.model = opts?.model || "llama3";
    // Ollama v1 default
    this.baseUrl = opts?.baseUrl || "http://localhost:11434/v1";
    this.timeoutMs = opts?.timeoutMs ?? 3000; // 3s default
  }

  private buildPrompt(input: SummarizeInput) {
    const { intent, stats, forecast } = input;
    return `Summarize the following analytics results concisely as human-friendly insights. Intent: ${intent}. Stats: ${JSON.stringify(
      stats
    )}. Forecast: ${JSON.stringify(forecast)}.`;
  }

  async summarize(input: SummarizeInput) {
    const prompt = this.buildPrompt(input);
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), this.timeoutMs);
      const fetchFn = (globalThis as any).fetch;
      if (!fetchFn) throw new Error('Fetch not available in runtime; install node >=18 or provide fetch polyfill');
      // Ollama v1/generic payload: send model and prompt; be tolerant of responses
      const resp = await fetchFn(this.baseUrl, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: this.model, prompt, max_tokens: 300 }),
      });
      clearTimeout(id);
      if (!resp.ok) throw new Error(`Local AI responded ${resp.status}`);
      const data = await resp.json();
      // Ollama or similar may return { text } or { completions: [...] }
      const text = (data?.text || data?.result || data?.completions?.[0]?.data?.[0]?.text || data?.output || data?.choices?.[0]?.text || "").toString();
      if (!text) throw new Error("Empty response from local AI");
      return { success: true, text };
    } catch (err) {
      // Template fallback
      const fallback = `The data shows a ${this.estimatePercent(input)}% change over the observed period. (Summary generated deterministically; local AI unavailable)`;
      return { success: false, text: fallback };
    }
  }

  private estimatePercent(input: SummarizeInput) {
    try {
      // derive a rough percent from stats if possible
      const stats = input.stats;
      const keys = Object.keys(stats || {});
      if (keys.length === 0) return 0;
      const firstKey = keys[0];
      const s = stats[firstKey];
      if (!s) return 0;
      const pc = typeof s.percentChange === 'number' ? Math.round(s.percentChange) : 0;
      return pc;
    } catch (e) {
      return 0;
    }
  }
}

export default LocalAI;
