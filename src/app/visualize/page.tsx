"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

interface ProcessedData {
  postTypes: { [key: string]: number };
  totalEngagement: { likes: number; shares: number; comments: number };
  dates: string[];
  likes: number[];
  shares: number[];
  comments: number[];
  details: Array<{
    date: string;
    type: string;
    likes: number;
    shares: number;
    comments: number;
    engagementRate: string;
  }>;
}

const VisualizePage: React.FC = () => {
  const [data, setData] = useState<ProcessedData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/analyze/csv");
        const rawData = await response.json();

        const processedData = processCsvData(rawData);
        setData(processedData);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p className="text-center text-white">Loading data...</p>;
  }

  // Chart data
  const pieData = {
    labels: Object.keys(data.postTypes),
    datasets: [
      {
        data: Object.values(data.postTypes),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71"],
      },
    ],
  };

  const lineData = {
    labels: data.dates,
    datasets: [
      {
        label: "Likes",
        data: data.likes,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Shares",
        data: data.shares,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Comments",
        data: data.comments,
        borderColor: "green",
        fill: false,
      },
    ],
  };

  const barData = {
    labels: Object.keys(data.postTypes),
    datasets: [
      {
        label: "Likes",
        data: data.likes.slice(0, Object.keys(data.postTypes).length),
        backgroundColor: "red",
      },
      {
        label: "Shares",
        data: data.shares.slice(0, Object.keys(data.postTypes).length),
        backgroundColor: "blue",
      },
      {
        label: "Comments",
        data: data.comments.slice(0, Object.keys(data.postTypes).length),
        backgroundColor: "green",
      },
    ],
  };

  return (
    <div className="p-4 bg-slate-950 min-h-screen text-white">
      {/* Add padding to fix navigation overlap */}
      <div className="pt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Social Media Analytics
        </h1>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <input
              type="date"
              className="px-3 py-2 rounded bg-transparent border text-white text-sm"
              defaultValue="2025-01-01"
            />
            <input
              type="date"
              className="px-3 py-2 rounded bg-transparent border text-white text-sm"
              defaultValue="2025-01-31"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
            Apply
          </button>
        </div>

        {/* Post Distribution, Engagement Summary, and Total Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-transparent border p-4 rounded flex justify-between items-center">
            <div className="text-sm flex-1 mr-4">
              <h2 className="font-bold mb-2">Post Distribution</h2>
              <ul className="text-xs space-y-1">
                {Object.entries(data.postTypes).map(([type, count], index) => (
                  <li key={index} className="flex justify-between">
                    <span>{type}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-60 h-60">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-transparent border p-4 rounded">
            <h2 className="text-sm font-bold mb-2">Engagement Summary</h2>
            <ul className="text-xs space-y-1">
              <li className="flex justify-between">
                <span>Likes</span>
                <span>{data.totalEngagement.likes.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span>Shares</span>
                <span>{data.totalEngagement.shares.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span>Comments</span>
                <span>{data.totalEngagement.comments.toLocaleString()}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Line Chart and Bar Chart in the Same Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-transparent border p-4 rounded">
            <h2 className="text-sm font-bold mb-2">Post Performance Over Time</h2>
            <div className="h-64">
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-transparent border p-4 rounded">
            <h2 className="text-sm font-bold mb-2">Post Type Comparison</h2>
            <div className="h-64">
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-transparent border p-4 rounded">
          <h2 className="text-sm font-bold mb-2">Post Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-xs border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2 text-left border-b border-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-700">
                    Post Type
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-700">
                    Likes
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-700">
                    Shares
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-700">
                    Comments
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-700">
                    Engagement Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.details.map((detail, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700`}
                  >
                    <td className="px-4 py-2 border-b border-gray-700">
                      {detail.date}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {detail.type}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {detail.likes}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {detail.shares}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {detail.comments}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {detail.engagementRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizePage;

// Function to process CSV data
interface CsvRow {
  Date: string;
  Post_Type: string;
  Likes: string;
  Shares: string;
  Comments: string;
}

const processCsvData = (rawData: CsvRow[]): ProcessedData => {
  const postTypes: { [key: string]: number } = {};
  const totalEngagement = { likes: 0, shares: 0, comments: 0 };
  const dates: string[] = [];
  const likes: number[] = [];
  const shares: number[] = [];
  const comments: number[] = [];
  const details: Array<{
    date: string;
    type: string;
    likes: number;
    shares: number;
    comments: number;
    engagementRate: string;
  }> = [];

  rawData.forEach((row) => {
    const { Date, Post_Type, Likes, Shares, Comments } = row;
    postTypes[Post_Type] = (postTypes[Post_Type] || 0) + 1;

    totalEngagement.likes += Number(Likes);
    totalEngagement.shares += Number(Shares);
    totalEngagement.comments += Number(Comments);

    dates.push(Date);
    likes.push(Number(Likes));
    shares.push(Number(Shares));
    comments.push(Number(Comments));

    const engagementRate = "100%"; // Example: Replace with your calculation
    details.push({
      date: Date,
      type: Post_Type,
      likes: Number(Likes),
      shares: Number(Shares),
      comments: Number(Comments),
      engagementRate,
    });
  });

  return { postTypes, totalEngagement, dates, likes, shares, comments, details };
};
