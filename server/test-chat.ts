import axios from "axios";

(async () => {
  const res = await axios.post("http://localhost:3000/api/chat", {
    message: "Who is Devicharan?",
  });
  console.log("Bot:", (res.data as any).reply || res.data);
})();
