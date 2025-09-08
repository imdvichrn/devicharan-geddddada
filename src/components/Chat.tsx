// Simple chat UI for portfolio assistant
import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chartData]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setChartData(data.chartData || null);
    setInput("");
    setIsLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto p-4 border rounded shadow bg-white/80">
      <div className="mb-2 font-bold text-lg">Devi charañ assistant</div>
      <div className="h-64 overflow-y-auto bg-gray-50 p-2 rounded mb-2">
        {messages.map((m, i) => (
          <div key={i} className={`mb-1 text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
            <span className={m.role === "user" ? "bg-blue-100 px-2 py-1 rounded" : "bg-gray-200 px-2 py-1 rounded"}>
              {m.content}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-xs text-gray-400">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      {chartData && (
        <div className="my-2 p-2 border rounded bg-white">
          <div className="font-semibold mb-1">Chart Data</div>
          {chartData.data ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-sm text-gray-600">{chartData.message || 'Chart data available'}</div>
          )}
        </div>
      )}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
