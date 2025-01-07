"use client";

import React from "react";
import {  Line, Pie } from "react-chartjs-2";
import { useData } from "../components/DataContext";

const VisualizePage: React.FC = () => {
  const { data } = useData();

  if (!data) {
    return <p>No data available. Please go back and fetch data.</p>;
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
