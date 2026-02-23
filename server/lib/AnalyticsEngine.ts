// Pure TypeScript analytics utilities — no external math libs
export type MetricPoint = { timestamp: string; value: number; category?: string; metric?: string; unit?: string };

export class AnalyticsEngine {
  data: MetricPoint[];
  constructor(data: MetricPoint[] = []) {
    this.data = data.slice();
  }

  // Load from server/data/analytics.json
  static loadFromFile(path: string) {
    // Lazy import to keep module side-effects minimal
    const fs = require('fs');
    const raw = fs.readFileSync(path, 'utf8');
    const parsed = JSON.parse(raw);
    const metrics: MetricPoint[] = parsed.metrics || [];
    return new AnalyticsEngine(metrics);
  }

  // Group by a key (category or metric), default none
  private groupBy(key?: 'category' | 'metric') {
    if (!key) return { all: this.data } as Record<string, MetricPoint[]>;
    return this.data.reduce((acc: Record<string, MetricPoint[]>, p) => {
      const k = (p as any)[key] || 'unknown';
      if (!acc[k]) acc[k] = [];
      acc[k].push(p);
      return acc;
    }, {});
  }

  getAggregates(key?: 'category' | 'metric') {
    const groups = this.groupBy(key);
    const result: Record<string, { sum: number; avg: number; max: number; min: number; count: number }> = {};
    for (const [k, points] of Object.entries(groups)) {
      const values = points.map(p => p.value);
      const sum = values.reduce((s, v) => s + v, 0);
      const avg = values.length ? sum / values.length : 0;
      const max = values.length ? Math.max(...values) : 0;
      const min = values.length ? Math.min(...values) : 0;
      result[k] = { sum, avg, max, min, count: values.length };
    }
    return result;
  }

  // Moving average per-group over the last `period` points
  getMovingAverage(period = 3, key?: 'category' | 'metric') {
    const groups = this.groupBy(key);
    const result: Record<string, { ma: number[]; period: number }> = {};
    for (const [k, points] of Object.entries(groups)) {
      const sorted = points.slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      const values = sorted.map(p => p.value);
      const ma: number[] = [];
      for (let i = 0; i < values.length; i++) {
        const window = values.slice(Math.max(0, i - period + 1), i + 1);
        const avg = window.reduce((s, v) => s + v, 0) / window.length;
        ma.push(Number(avg.toFixed(2)));
      }
      result[k] = { ma, period };
    }
    return result;
  }

  // Z-scores for anomaly detection per-group
  getZScores(key?: 'category' | 'metric') {
    const groups = this.groupBy(key);
    const result: Record<string, { zscores: number[]; mean: number; std: number }> = {};
    for (const [k, points] of Object.entries(groups)) {
      const values = points.map(p => p.value);
      const n = values.length;
      const mean = n ? values.reduce((s, v) => s + v, 0) / n : 0;
      const variance = n ? values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / n : 0;
      const std = Math.sqrt(variance);
      const zscores = values.map(v => (std === 0 ? 0 : Number(((v - mean) / std).toFixed(2))));
      result[k] = { zscores, mean: Number(mean.toFixed(2)), std: Number(std.toFixed(2)) };
    }
    return result;
  }

  // Compute linear regression slope (m) and intercept (b) given sorted points by timestamp
  private linearRegression(points: MetricPoint[]) {
    if (!points || points.length === 0) return { m: 0, b: 0 };
    // convert timestamps to numeric x (days since first)
    const xs: number[] = [];
    const ys: number[] = [];
    const t0 = new Date(points[0].timestamp).getTime();
    for (let i = 0; i < points.length; i++) {
      xs.push((new Date(points[i].timestamp).getTime() - t0) / (1000 * 60 * 60 * 24));
      ys.push(points[i].value);
    }
    const n = xs.length;
    if (n === 1) return { m: 0, b: ys[0] };
    const sumX = xs.reduce((s, v) => s + v, 0);
    const sumY = ys.reduce((s, v) => s + v, 0);
    const sumXY = xs.reduce((s, v, i) => s + v * ys[i], 0);
    const sumXX = xs.reduce((s, v) => s + v * v, 0);
    const denom = n * sumXX - sumX * sumX;
    const m = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;
    const b = (sumY - m * sumX) / n;
    return { m, b };
  }

  getTrends(key?: 'category' | 'metric') {
    const groups = this.groupBy(key);
    const trends: Record<string, { slope: number; intercept: number; trend: string; percentChange: number }> = {};
    for (const [k, points] of Object.entries(groups)) {
      const sorted = points.slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      const { m, b } = this.linearRegression(sorted);
      const first = sorted[0]?.value ?? 0;
      const last = sorted[sorted.length - 1]?.value ?? 0;
      const percentChange = first === 0 ? 0 : ((last - first) / Math.abs(first)) * 100;
      const trend = Math.abs(m) < 1e-9 ? 'Flat' : (m > 0 ? 'Growing' : 'Declining');
      trends[k] = { slope: m, intercept: b, trend, percentChange };
    }
    return trends;
  }

  // Forecast next `n` points using fitted linear model. Returns array of {timestamp, value}
  getForecast(periods = 3, key?: 'category' | 'metric') {
    const groups = this.groupBy(key);
    const forecasts: Record<string, { next: { timestamp: string; value: number }[]; method: string }> = {};
    for (const [k, points] of Object.entries(groups)) {
      const sorted = points.slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      if (sorted.length === 0) {
        forecasts[k] = { next: [], method: 'linear_regression' };
        continue;
      }
      const t0 = new Date(sorted[0].timestamp).getTime();
      const dayDiffs = sorted.map(p => (new Date(p.timestamp).getTime() - t0) / (1000 * 60 * 60 * 24));
      const { m, b } = this.linearRegression(sorted);
      // estimate time step as average diff (or 30 days fallback)
      let step = 30;
      if (dayDiffs.length >= 2) {
        let total = 0;
        for (let i = 1; i < dayDiffs.length; i++) total += dayDiffs[i] - dayDiffs[i - 1];
        step = total / (dayDiffs.length - 1) || 30;
      }
      const lastX = dayDiffs[dayDiffs.length - 1];
      const next: { timestamp: string; value: number }[] = [];
      for (let i = 1; i <= periods; i++) {
        const x = lastX + step * i;
        const v = m * x + b;
        const ts = new Date(t0 + x * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        next.push({ timestamp: ts, value: Number(v.toFixed(2)) });
      }
      forecasts[k] = { next, method: 'linear_regression' };
    }
    return forecasts;
  }

  // Produce a Recharts-friendly chartSpec for a selected metric key
  produceChartSpec(selectedMetric: string) {
    const filtered = this.data.filter(d => d.metric === selectedMetric).slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const data = filtered.map(d => ({ timestamp: d.timestamp, value: d.value }));
    const type = 'line';
    const axis = 'date';
    return { type, data, axis };
  }

  // Simple heuristic: categorical -> 'bar', time series -> 'line'
  autoChart(key?: 'category' | 'metric') {
    if (key === 'category' || key === 'metric') return 'bar';
    return 'line';
  }
}

export default AnalyticsEngine;
