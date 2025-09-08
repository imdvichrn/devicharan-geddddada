// Portfolio chatbot UI with backend integration
import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

interface ChartData {
  type?: string;
  labels?: string[];
  series?: Array<{ name: string; data: number[] }>;
  data?: Array<{ name: string; value: number }>;
  message?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hi! I'm Devicharan's AI assistant. Ask me anything about his portfolio, projects, or experience!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chartData]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setChartData(null);
    
    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      console.log("[Chat] Sending message to backend:", userMessage);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log("[Chat] Received response:", data);
      
      // Add assistant message with sources
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: data.reply || "Sorry, I couldn't process that request.",
        sources: data.sources || []
      }]);
      
      // Set chart data if present
      if (data.chartData) {
        setChartData(data.chartData);
      }
    } catch (error) {
      console.error("[Chat] Error sending message:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble connecting to the server. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  const renderChart = (data: ChartData) => {
    if (data.message && !data.data && !data.series) {
      return (
        <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded">
          {data.message}
        </div>
      );
    }

    // Handle simple data array
    if (data.data && Array.isArray(data.data)) {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // Handle complex series data
    if (data.series && data.labels) {
      const chartData = data.labels.map((label, index) => ({
        name: label,
        ...data.series!.reduce((acc, series) => {
          acc[series.name] = series.data[index] || 0;
          return acc;
        }, {} as Record<string, number>)
      }));

      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.series.map((series, index) => (
              <Line 
                key={series.name} 
                type="monotone" 
                dataKey={series.name} 
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded">
        Chart data format not supported yet
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <h2 className="text-lg font-semibold">Devicharan's Portfolio Assistant</h2>
        <p className="text-blue-100 text-sm">Ask me about projects, skills, and experience</p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === "user" 
                ? "bg-blue-500 text-white" 
                : "bg-white border shadow-sm"
            }`}>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              
              {/* Sources */}
              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500 font-medium mb-1">Sources:</div>
                  <div className="flex flex-wrap gap-1">
                    {message.sources.map((source, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border shadow-sm rounded-lg px-4 py-2 max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chart Section */}
      {chartData && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Chart Data</h3>
          </div>
          {renderChart(chartData)}
        </div>
      )}

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Devicharan's projects, skills, or experience..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
