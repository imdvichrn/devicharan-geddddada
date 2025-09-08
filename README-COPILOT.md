# Copilot Chatbot Backend/Frontend Integration

## Quick Start

1. Install dependencies:
   ```sh
   npm install express openai dotenv body-parser recharts
   npm install --save-dev ts-node-dev @types/express @types/node
   ```

2. Copy `.env.example` to `.env` and add your real DeepSeek API key:
   ```sh
   cp .env.example .env
   # Edit .env and paste your real DEEPSEEK_API_KEY
   ```

3. Add your portfolio text files to `server/data/` directory:
   - About.txt (your background, bio)
   - Projects.txt (project descriptions)  
   - Resume.txt (experience, skills)
   - Any other relevant .txt or .md files

4. Build the vector database:
   ```sh
   npx ts-node server/ingest.ts
   ```
   This creates `server/vectors.json` with embeddings of your content.

5. Start the backend server:
   ```sh
   npx ts-node server/index.ts
   ```
   Server runs on http://localhost:5174

6. Start the frontend dev server:
   ```sh
   npm run dev
   ```
   Frontend runs on http://localhost:8080 (or your Vite port)

7. Test the chatbot on your site!

## Features

- **RAG (Retrieval Augmented Generation)**: Searches your portfolio data first
- **DeepSeek Integration**: Uses `text-embedding-3-small` and `deepseek-chat` models
- **Memory**: Remembers last 10 conversation items for context
- **Chart Support**: Can display simple charts with Recharts
- **Local Storage**: All vectors and memory stored in JSON files

## File Structure

```
server/
├── index.ts          # Express server entry
├── api/chat.ts       # Main chat endpoint with RAG + memory
├── vectorStore.ts    # Vector search functions
├── ingest.ts         # Script to build vectors from data/
├── memory.ts         # Simple conversation memory
├── data/            # Your portfolio .txt/.md files go here
├── vectors.json     # Generated embeddings (after ingest)
└── memory.json      # Conversation history

src/components/
└── Chat.tsx         # React chat UI with Recharts integration
```

## Notes

- `.env` is ignored by git - never commit your real API key
- All vector storage is local JSON, no external database needed
- Memory is limited to 100 items maximum
- Chart support: drop CSV data in prompts or extend chart detection logic
- Adjust embedding/chat models in code if needed

## Troubleshooting

- Make sure your `.env` has the correct `DEEPSEEK_API_KEY` and `DEEPSEEK_BASE_URL`
- Run `ingest.ts` after adding new files to `server/data/`
- Check server console for embedding and search logs
- Frontend chat UI sends POST requests to `/api/chat`
