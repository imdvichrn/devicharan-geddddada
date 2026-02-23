// DO NOT COMMIT .env
// Simple file-based memory helpers
import fs from "fs";
import path from "path";

const MEMORY_PATH = path.join(__dirname, "memory.json");
const MAX_ITEMS = 100;

// Simple LRU in-memory cache for computed results (e.g., analytics)
const CACHE_MAX = 200;
const cacheMap = new Map<string, { value: any; ts: number }>();
const cacheOrder: string[] = []; // oldest at 0, newest at end
let cacheHits = 0;
let cacheMisses = 0;

export function setCache(key: string, value: any) {
  const ts = Date.now();
  if (cacheMap.has(key)) {
    // update and move to newest
    cacheMap.set(key, { value, ts });
    const idx = cacheOrder.indexOf(key);
    if (idx >= 0) cacheOrder.splice(idx, 1);
    cacheOrder.push(key);
  } else {
    cacheMap.set(key, { value, ts });
    cacheOrder.push(key);
    // evict oldest if over capacity
    if (cacheOrder.length > CACHE_MAX) {
      const oldest = cacheOrder.shift()!;
      cacheMap.delete(oldest);
    }
  }
}

export function getCache(key: string) {
  const v = cacheMap.get(key);
  if (!v) {
    cacheMisses++;
    return null;
  }
  cacheHits++;
  // move to newest
  const idx = cacheOrder.indexOf(key);
  if (idx >= 0) {
    cacheOrder.splice(idx, 1);
    cacheOrder.push(key);
  }
  return v.value;
}

export function getCacheStats() {
  return { size: cacheOrder.length, hits: cacheHits, misses: cacheMisses };
}

export function addMemory(item: any) {
  const mem = getMemory();
  mem.push({ ...item, id: Date.now() });
  while (mem.length > MAX_ITEMS) mem.shift();
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(mem, null, 2));
}

export function getMemory(limit = 50) {
  if (!fs.existsSync(MEMORY_PATH)) return [];
  const mem = JSON.parse(fs.readFileSync(MEMORY_PATH, "utf8"));
  return mem.slice(-limit);
}

export function clearMemory() {
  fs.writeFileSync(MEMORY_PATH, "[]");
}

// Observability: simple latency recording for math and AI engines
let mathTotalMs = 0;
let mathCount = 0;
let aiTotalMs = 0;
let aiCount = 0;

export function recordMathLatency(ms: number) {
  mathTotalMs += ms;
  mathCount++;
}

export function recordAILatency(ms: number) {
  aiTotalMs += ms;
  aiCount++;
}

export function getMetrics() {
  return {
    cache: getCacheStats(),
    math: { count: mathCount, avgMs: mathCount ? Math.round(mathTotalMs / mathCount) : 0 },
    ai: { count: aiCount, avgMs: aiCount ? Math.round(aiTotalMs / aiCount) : 0 }
  };
}
