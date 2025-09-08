// DO NOT COMMIT .env
// Script to index text files into local vector store
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { upsert } from "./vectorStore.js";

dotenv.config();

const DATA_DIR = path.join(__dirname, "data");
const VECTORS_PATH = path.join(__dirname, "vectors.json");
const EMBEDDING_MODEL = "text-embedding-3-small"; // TODO: adjust if needed
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

function chunkText(text: string, chunkSize = 700): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    let end = i + chunkSize;
    // Try to break at sentence boundary
    if (end < text.length) {
      const nextPeriod = text.indexOf(".", end);
      if (nextPeriod !== -1 && nextPeriod - i < chunkSize * 1.5) {
        end = nextPeriod + 1;
      }
    }
    chunks.push(text.slice(i, end).trim());
    i = end;
  }
  return chunks.filter(Boolean);
}

async function ingest() {
  const files = fs.readdirSync(DATA_DIR).filter(f => /\.(txt|md)$/i.test(f));
  let allDocs: any[] = [];
  for (const file of files) {
    const fullPath = path.join(DATA_DIR, file);
    const text = fs.readFileSync(fullPath, "utf8");
    const chunks = chunkText(text);
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];
      const embedResp = await client.embeddings.create({ model: EMBEDDING_MODEL, input: chunk });
      const embedding = embedResp.data[0].embedding;
      allDocs.push({ source: file, chunk: idx, text: chunk, embedding });
      console.log(`[ingest] Embedded chunk ${idx + 1}/${chunks.length} from ${file}`);
    }
  }
  upsert(allDocs);
  console.log(`[ingest] Ingested ${allDocs.length} chunks from ${files.length} files.`);
}

ingest();
