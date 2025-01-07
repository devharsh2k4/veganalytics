"use client";

import React, { useState } from "react";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { user: userMessage, bot: "..." }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, bot: data.reply } : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, bot: "Error: Unable to fetch response." } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: "Error: Unable to fetch response." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Chat with LangFlow</h1>

      <div className="bg-gray-800 p-4 rounded-md h-[60vh] overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-400">Start a conversation...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <p className="text-blue-400">
                <strong>User:</strong> {msg.user}
              </p>
              <p className="text-green-400">
                <strong>Bot:</strong> {msg.bot}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
