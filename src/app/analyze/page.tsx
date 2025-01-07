"use client";

import React, { useState } from "react";
import axios from "axios";
import { useData } from "../components/DataContext";

const AnalyzePage: React.FC = () => {
  const { setData } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      setError("");
      if (!file) {
        setError("Please upload a CSV file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/analyze/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Provide Engagement Data</h1>
      <div className="mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-700 file:text-white"
        />
      </div>
      <button
        onClick={handleFetch}
        className="px-4 py-2 bg-blue-500 rounded text-white"
      >
        Fetch
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AnalyzePage;
