# Echoless: Automated Portfolio Assistant

**Echoless** is an intelligent, offline-first chatbot assistant that answers visitor questions about Devicharan's portfolio, projects, skills, and availability.

## Key Features

✅ **Math-First Processing** — Deterministic analytics before any AI  
✅ **Slash-Command Routing** — Fast intent detection via `/social`, `/projects`, etc.  
✅ **Offline-Ready** — Uses local Ollama models; falls back to templates if unavailable  
✅ **LRU Caching** — Memoizes results for ≥70% repeat-query speedup  
✅ **Structured JSON** — Every response returns intent, insights, chart data, latency  
✅ **Zero Hallucination** — Only returns data from source files (about.txt, contact.txt, analytics.json)  

---

## Architecture

```
User Query
    ↓
[Intent Detection] → mapToEcholessIntent()
    ↓
┌─────────────────────────────────────┐
│ Is it Deterministic?                │
│ (ABOUT, PROJECTS, SKILLS, SOCIAL... │
└─────────────────────────────────────┘
    ├─ YES → [ContentParser] → buildEcholessResponse() → JSON
    │
    └─ NO (AI_CHART_BOT) → [AnalyticsEngine] → [LocalAI] → JSON
```

---

## Endpoints

### `/api/chat` (POST)

**Request body:**
```json
{
  "message": "what languages do you know"
}
```
or
```json
{
  "messages": [
    { "role": "user", "content": "show projects" }
  ]
}
```

**Response (all intents):**
```json
{
  "intent": "SKILLS_INTENT",
  "chartSpec": null,
  "insights": [
    "Technical Expertise:",
    "- Languages: JavaScript, TypeScript, Python",
    "- Frameworks & Tools: React, Node.js, Express"
  ],
  "forecast": {},
  "confidence": 1,
  "meta": {
    "timestamp": "2026-02-23T...",
    "latency": "8ms"
  }
}
```

### `/health` (GET)

**Response:**
```json
{
  "status": "ok",
  "uptime": 1234.5,
  "timestamp": "2026-02-23T..."
}
```

### `/metrics` (GET)

**Response:**
```json
{
  "status": "ok",
  "metrics": {
    "cache": { "size": 5, "hits": 42, "misses": 8 },
    "math": { "count": 3, "avgMs": 15 },
    "ai": { "count": 2, "avgMs": 850 }
  },
  "timestamp": "2026-02-23T..."
}
```

---

## Intent Types & Examples

| Intent | Triggers | Response | Latency |
|--------|----------|----------|---------|
| **ABOUT_INTENT** | "who are you", "your background", "about devicharan" | Profile summary + core identity | ~5ms |
| **PROJECTS_INTENT** | "show projects", "your work", "portfolio" | Project list (up to 5) | ~5ms |
| **SKILLS_INTENT** | "skills", "tech stack", "what languages" | Technical expertise bullets | ~5ms |
| **CONTACT_INTENT** | "contact", "email", "reach you" | Primary email + phone | ~5ms |
| **SOCIAL_INTENT** | "github", "linkedin", "instagram" | Social handles/URLs | ~5ms |
| **HIRING_INTENT** | "available for hire", "open to work", "freelance" | Availability statement | ~5ms |
| **AI_CHART_BOT_INTENT** | "chart views", "/chart", "forecast" | Chart + trends + forecast | ~100-1000ms |
| **FALLBACK_INTENT** | Unclear input | Helpful suggestion + options | ~5ms |

---

## Running Locally

### Option 1: Development (JIT)
```bash
npm install
npm run dev:server
```
This uses `ts-node-esm` to run TypeScript directly. Perfect for development.

### Option 2: Production (Compiled)
```bash
npm install
npm run build
npm start
```
This compiles to `dist/` and runs pure JavaScript. Faster startup and no TypeScript overhead.

### Test with curl

**1. Check health:**
```bash
curl -s http://localhost:5174/health | jq .
```

**2. About intent:**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"who are you"}' | jq .
```

**3. Skills intent:**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what languages"}' | jq .
```

**4. Social intent (Instagram):**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what is your instagram"}' | jq .
```

**5. Projects intent:**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"show your projects"}' | jq .
```

**6. Contact intent:**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"how to contact you"}' | jq .
```

**7. Hiring intent:**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"are you open to work"}' | jq .
```

**8. Chart/Analytics intent:**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"/chart views"}' | jq .
```

**9. Cache hit (repeat):**
```bash
curl -s -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what languages"}' | jq '.meta'
```
Should show `"cached": true` and `<5ms` latency on second call.

**10. Metrics:**
```bash
curl -s http://localhost:5174/metrics | jq .
```

---

## Data Sources

All responses are deterministically pulled from:

| File | Purpose |
|------|---------|
| `server/data/about.txt` | Profile, role, mission, DaVinci Resolve pillars |
| `server/data/contact.txt` | Email, phone, social links |
| `server/data/skills.txt` | Technical stack, soft skills |
| `server/data/projects.txt` | Project list with descriptions |
| `server/data/experience.txt` | Work experience and availability |
| `server/data/analytics.json` | Metrics time-series for `/chart` queries |

---

## Behavioral Guarantees

### ✓ Zero Hallucination
- No data is fabricated or guessed.
- If a field is missing, Echoless returns "No [field] found."

### ✓ Typo Tolerance
- "insta" → detects Instagram  
- "projcts" → detects projects  
- "cntact" → detects contact  

### ✓ Short Query Support
- "github?" → returns GitHub handle  
- "hire?" → returns availability  
- "/social" → returns all social links  

### ✓ Offline-First
- If Ollama is down, `/chart` returns deterministic trends + fallback text.
- No API key needed; never requires internet.

### ✓ Performance
- Deterministic intents: **<10ms**  
- Cached intents: **<5ms**  
- Chart + AI: **<1.5s** (target)  

---

## Environment Variables

Optional (defaults to localhost):
```bash
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=llama3
PORT=5174
```

---

## Next Steps

1. **Start the server** and test endpoints above.
2. **Monitor `/metrics`** to track cache hits and latency.
3. **Customize data** by editing `server/data/*.txt` and `server/data/analytics.json`.
4. **Deploy** by running `npm run build && npm start`.

---

## FAQ

**Q: Can I customize the bot's responses?**  
A: Yes! Edit the `.txt` files in `server/data/`. The bot deterministically reads from them.

**Q: Does it need an API key?**  
A: No. Echoless is fully offline. It only uses local Ollama (optional) for rich summaries.

**Q: How do I add more analytics?**  
A: Edit `server/data/analytics.json`. The AnalyticsEngine will automatically compute trends, forecasts, and charts.

**Q: Can I deploy this?**  
A: Yes! Run `npm run build` to compile to `dist/`, then `npm start` to run. It's a standard Node.js Express app.

---

## Support

For issues, check:
1. `/health` endpoint — is the server running?
2. `/metrics` endpoint — are requests being cached?
3. `server/data/*.txt` files — is data present and formatted correctly?

