"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  user: string;
  bot: string;
}

const ChatPage: React.FC = () => {
  const [tabs, setTabs] = useState<{ id: number; messages: Message[] }[]>([
    { id: 1, messages: [] },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTab
          ? {
              ...tab,
              messages: [...tab.messages, { user: userMessage, bot: "..." }],
            }
          : tab
      )
    );
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
        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === activeTab
              ? {
                  ...tab,
                  messages: tab.messages.map((msg, index) =>
                    index === tab.messages.length - 1
                      ? { ...msg, bot: data.reply }
                      : msg
                  ),
                }
              : tab
          )
        );
      } else {
        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === activeTab
              ? {
                  ...tab,
                  messages: tab.messages.map((msg, index) =>
                    index === tab.messages.length - 1
                      ? { ...msg, bot: "Error: Unable to fetch response." }
                      : msg
                  ),
                }
              : tab
          )
        );
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.id === activeTab
            ? {
                ...tab,
                messages: tab.messages.map((msg, index) =>
                  index === tab.messages.length - 1
                    ? { ...msg, bot: "Error: Unable to fetch response." }
                    : msg
                ),
              }
            : tab
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTab = () => {
    const newTabId = tabs.length + 1;
    setTabs([...tabs, { id: newTabId, messages: [] }]);
    setActiveTab(newTabId);
  };

  const closeTab = (id: number) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">VegaAnalytics</h1>
        <div className="space-y-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer ${
                tab.id === activeTab ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>Conversation {tab.id}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="text-red-400 hover:text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addNewTab}
            className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-center"
          >
            + New Tab
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col" style={{ marginTop: "4rem" }}>
        <div className="flex-1 bg-gray-900 p-6 overflow-y-auto">
          {currentTab && currentTab.messages.length === 0 ? (
            <p className="text-gray-400 text-center">Start a conversation...</p>
          ) : (
            currentTab?.messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <p className="text-blue-400">
                  <strong>User:</strong> {msg.user}
                </p>
                <div className="text-green-400">
                  <strong>Bot:</strong>{" "}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.bot}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        <div className="bg-gray-800 p-4">
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
      </div>
    </div>
  );
};

export default ChatPage;
