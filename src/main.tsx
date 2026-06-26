import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Hard fallback: ensure browser tab identity is always the personal brand,
// never a deployment platform or framework default.
const BRAND_NAME = "Geddada Devicharan | AI Systems, Editing & Workflow Automation";
const FORBIDDEN_TITLES = /^(\s*|vercel|vercel app|untitled|react app|vite app|vite \+ react)\s*$/i;
if (!document.title || FORBIDDEN_TITLES.test(document.title)) {
  document.title = BRAND_NAME;
}
// Guard against any later script clobbering the title with a forbidden value.
const titleEl = document.querySelector("title");
if (titleEl) {
  new MutationObserver(() => {
    if (FORBIDDEN_TITLES.test(document.title)) document.title = BRAND_NAME;
  }).observe(titleEl, { childList: true, characterData: true, subtree: true });
}

createRoot(document.getElementById("root")!).render(<App />);
