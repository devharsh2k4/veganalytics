"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface ProcessedData {
  reel: number;
  carousel: number;
  static: number;
  dates: string[];
  likes: number[];
  shares: number[];
  comments: number[];
}

const VisualizePage: React.FC = () => {
  const [data, setData] = useState<ProcessedData | null>(null);

  useEffect(() => {
    // Simulate fetching processed CSV data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/analyze/csv");
        const rawData = await response.json();

        // Process CSV data into the required format
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
    labels: ["Reel", "Carousel", "Static"],
    datasets: [
      {
        data: [data.reel, data.carousel, data.static],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Visualize Data</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Post Distribution</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Post Performance Over Time</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default VisualizePage;

// Function to process CSV data
interface RawData {
  Post_Type: string;
  Likes: string;
  Shares: string;
  Comments: string;
}

const processCsvData = (rawData: RawData[]): ProcessedData => {
  const postTypes = { Reel: 0, Carousel: 0, Static: 0 };
  const dates: string[] = [];
  const likes: number[] = [];
  const shares: number[] = [];
  const comments: number[] = [];

  rawData.forEach((row) => {
    const { Post_Type, Likes, Shares, Comments } = row;
    if (postTypes[Post_Type as keyof typeof postTypes] !== undefined) {
      postTypes[Post_Type as keyof typeof postTypes] += 1;
    }

    dates.push(`${dates.length + 1}`); // Simulating sequential days
    likes.push(Number(Likes));
    shares.push(Number(Shares));
    comments.push(Number(Comments));
  });

  return {
    reel: postTypes["Reel"] || 0,
    carousel: postTypes["Carousel"] || 0,
    static: postTypes["Static"] || 0,
    dates,
    likes,
    shares,
    comments,
  };
};
