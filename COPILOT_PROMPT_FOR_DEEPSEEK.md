COPILOT PROMPT — Full instructions for VS Code + Copilot
(READ: paste this entire block into a new file in VS Code, then let GitHub Copilot/AI assist generate the files described below. Do NOT paste your real API key inside this prompt. After generation, create a local .env and put your key there.)

Goal
====
Create a small backend + frontend integration for my existing Vite React portfolio so the site has a chat bot that:
- answers from my site data (local RAG: index site text into a local vector store),
- falls back to DeepSeek chat when needed,
- returns structured chart data when asked to show charts,
- keeps a *small local memory* (file-based) for short-term facts,
- is beginner-friendly and does not require external vector DB (uses a simple JSON vector store),
- uses the DeepSeek API (OpenAI-compatible) for embeddings + chat.

Files to create (exact paths)
=============================
server/
  ├─ index.ts               # Express server entry
  ├─ api/chat.ts            # Chat route, RAG + DeepSeek integration
  ├─ ingest.ts              # Script to index text files into local vector store
  ├─ vectorStore.ts         # Simple JSON vector store + search (cosine sim)
  ├─ memory.ts              # Simple memory read/write helpers
  └─ data/                  # folder to hold text/CSVs to index (developer will add files here)

src/components/
  └─ Chat.tsx               # Frontend chat UI (React TSX) - simple and pluggable into App.tsx

project root:
  ├─ .env.example           # Example env file (user will copy -> .env and paste real key)
  └─ README-COPILOT.md      # Short run/test instructions

High-level behavior
===================
1. `ingest.ts`:
   - Reads all `.txt`/`.md` files from `server/data/` (developer will drop About, Projects, Resume, CSVs etc).
   - Splits large texts into chunks (~500-800 chars).
   - Calls DeepSeek/OpenAI-compatible embeddings endpoint to get embeddings for chunks.
   - Saves vectors to `server/vectors.json` with metadata (source file, chunk index, text, embedding).

2. `vectorStore.ts`:
   - Functions: `upsert(docs[])`, `search(queryEmbedding, topK)`.
   - Stores and loads from `server/vectors.json`.
   - Uses cosine similarity for search.

3. `memory.ts`:
   - Small file-based memory in `server/memory.json`.
   - Functions: `addMemory(item)`, `getMemory(limit)`, `clearMemory()`.
   - Keeps last N items (configurable, default 50).

4. `api/chat.ts`:
   - Accepts `{ message }` (string) or `{ messages }` (array) from frontend.
   - Detects **chart intent** with regex `/chart|plot|graph|visualize|trend|show.*data/i`. If chart intent:
     - Tries to find a CSV/JSON in `server/data/charts/` that matches keywords; if found, returns `chartData: { labels:[], series:[] }` plus explanation.
   - Otherwise:
     - Embed the user query (embeddings endpoint).
     - Search the `vectorStore` for top 5 chunks.
     - If top match similarity < threshold (0.65) → **no good local answer**; call DeepSeek chat with user question only (or with short system prompt) as fallback.
     - Else assemble `messages` for DeepSeek: system prompt instructing to prefer local docs, include retrieved chunks as context (short), include small memory items via `memory.getMemory(10)`.
     - Call DeepSeek chat completions endpoint.
     - Save a compact memory item if LLM suggests a preference or the user says "remember" (basic rule).
   - Returns JSON: `{ reply, sources: [...], chartData?: {...} }`.

5. `src/components/Chat.tsx`:
   - Simple chat UI: input, message list, send button.
   - POSTs to `/api/chat` with `{ message }`.
   - Renders `reply` text; if `chartData` present, uses Chart.js or Recharts to render (just a canvas placeholder is fine).

Env & security
=============
- Do NOT commit `.env`. Add `.env` to `.gitignore`.
- Create `.env` locally with:
DEEPSEEK_API_KEY=sk-16d7568034334d448e49673239e6fc74
DEEPSEEK_BASE_URL=https://api.deepseek.com
- In code, load with `dotenv` on server side only.

Implementation notes for the code generator (Copilot)
===================================================
- Use TypeScript for server files.
- Use `openai` npm package (OpenAI-compatible). Initialize like:
mport OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.DEEPSEEK_API_KEY, baseURL: process.env.DEEPSEEK_BASE_URL })
- For embeddings call: `client.embeddings.create({ model: "<embedding-model>", input: "..." })`
- Use model string compatible with DeepSeek; if unknown, default to `"text-embedding-3-small"` (user can adjust).
- For chat: `client.chat.completions.create({ model: "deepseek-chat", messages })`
- For cosine similarity: implement vector dot product / norm and sort results.

Memory & persistence
====================
- Memory file `server/memory.json` stores array of small objects:
`{ id, type, text, time }`.
- Chat route should call `memory.addMemory()` only for notable messages, or for all user messages if user preference is ON (configurable in code).
- Limit memory size to 100 items.

Chart support
=============
- Chart detection (regex above).
- Look in `server/data/charts/` for CSV files named `*.csv`. If found, parse first column as labels and numeric columns as series. Return `{ chartData: { labels, series: [{ name, data }] } }`. Frontend should render automatically.

Developer testing & run instructions
===================================
- In README-COPILOT.md write short commands:
1. `npm install express openai dotenv csv-parse` (plus ts-node-dev / types)
2. Create `.env` from `.env.example` and paste your key locally.
3. Run `node` or `ts-node` for server: `npx ts-node-dev server/index.ts` (or add scripts).
4. Start Vite dev server as usual.
5. Open site, go to the page where Chat component is mounted and test.

Tell Copilot specifically:
==========================
“Generate all the files listed above with TypeScript code. Make the vector store simple JSON-based (no external DB). Add helpful inline comments explaining each function. Make all external API calls to DeepSeek via the `openai` library with baseURL from env. Use simple chunking logic for ingest (split by sentences or 500–800 chars). Add useful console logs for debugging and set clear places where the developer must put their real DeepSeek API key in a local `.env`. At top of each generated server file, add a short comment that says: **DO NOT COMMIT .env**.”

Extra: What I (developer) will do afterwards
===========================================
- Copy `.env.example` -> `.env` and paste my actual DeepSeek key there.
- Add my site text files to `server/data/` (About, Projects, CV, any CSVs).
- Run `node server/ingest.ts` once to build `server/vectors.json`.
- Start server and test Chat component.
- If automatic web search is desired later, add SerpAPI or Bing Search API and set `ENABLE_WEB_FALLBACK=true` in `.env`.

Important: Replace API key placeholder locally
=============================================
- This prompt intentionally does NOT include your real API key. After files are generated, create `.env` and paste your real key in `DEEPSEEK_API_KEY` before starting the server.

If Copilot asks for clarifications, automatically generate reasonable defaults (embedding model `"text-embedding-3-small"`, chat model `"deepseek-chat"`, chunk size 700 characters) and create TODO comments so I can adjust later.

End of prompt.
