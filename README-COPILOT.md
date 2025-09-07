# Copilot Chatbot Backend/Frontend Integration

## Quick Start

1. Install dependencies:
   ```sh
   npm install express openai dotenv csv-parse
   npm install --save-dev ts-node-dev @types/express @types/node
   ```
2. Copy `.env.example` to `.env` and paste your DeepSeek API key.
3. Add your site text files to `server/data/` (About, Projects, Resume, CSVs, etc).
4. Run the ingest script:
   ```sh
   npx ts-node server/ingest.ts
   ```
5. Start the server:
   ```sh
   npx ts-node-dev server/index.ts
   ```
6. Start your Vite dev server as usual for the frontend.
7. Open your site and test the chat UI.

## Notes
- `.env` is ignored by git. Never commit your real API key.
- All vector storage is local JSON, no external DB needed.
- Chart support: drop CSVs in `server/data/charts/`.
- Adjust embedding/chat model in code if needed.
