// DO NOT COMMIT .env

import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const VECTORS_PATH = path.join(__dirname, "vectors.json");

interface Doc {
  source: string;
  chunk: number;
  text: string;
  embedding: number[];
}

// Save documents to vectors.json
export function upsert(docs: Doc[]) {
  let existing: Doc[] = [];
  if (fs.existsSync(VECTORS_PATH)) {
    existing = JSON.parse(fs.readFileSync(VECTORS_PATH, "utf8"));
  }
  const merged = [...existing, ...docs];
  fs.writeFileSync(VECTORS_PATH, JSON.stringify(merged, null, 2), "utf8");
}

// Load vectors
export function load(): Doc[] {
  if (!fs.existsSync(VECTORS_PATH)) return [];
  return JSON.parse(fs.readFileSync(VECTORS_PATH, "utf8"));
}

// Cosine similarity
function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}

// Search vectors
export function search(queryEmbedding: number[], topK = 5) {
  const all = load();
  return all
    .map(doc => ({
      ...doc,
      score: cosineSim(queryEmbedding, doc.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

