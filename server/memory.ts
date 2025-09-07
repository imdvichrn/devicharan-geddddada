// DO NOT COMMIT .env
// Simple file-based memory helpers
import fs from "fs";
import path from "path";

const MEMORY_PATH = path.join(__dirname, "memory.json");
const MAX_ITEMS = 100;

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
