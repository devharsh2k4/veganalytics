"use client";

import React from "react";
import {
  BarChart,
  Smile,
  Users,
  FileText,
  Sparkles,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: <BarChart className="text-blue-500" size={40} />,
    title: "Real-time Analytics",
    description:
      "Track your social media performance across platforms in real-time. Make data-driven decisions with up-to-the-minute insights.",
  },
  {
    icon: <Smile className="text-green-500" size={40} />,
    title: "Sentiment Analysis",
    description:
      "Understand the tone and emotion behind comments and messages. Gauge public perception of your brand accurately.",
  },
  {
    icon: <Users className="text-purple-500" size={40} />,
    title: "Competitor Benchmarking",
    description:
      "Compare your social media performance against competitors. Identify areas for improvement and opportunities for growth.",
  },
  {
    icon: <FileText className="text-yellow-500" size={40} />,
    title: "Custom Report Builder",
    description:
      "Create tailored reports with the metrics that matter most to your business. Share insights easily with stakeholders.",
  },
  {
    icon: <Sparkles className="text-pink-500" size={40} />,
    title: "AI-powered Content Suggestions",
    description:
      "Get intelligent recommendations for post content, hashtags, and optimal posting times based on your audience engagement patterns.",
  },
  {
    icon: <Share2 className="text-red-500" size={40} />,
    title: "Multi-platform Integration",
    description:
      "Connect and analyze data from all major social media platforms in one centralized dashboard for a holistic view of your online presence.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-slate-950 py-16">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-200 mb-6">
        Powerful Features
      </h2>
      <p className="text-center text-gray-400 mb-12">
        Everything you need to analyze and improve your social media presence
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 lg:px-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-lg p-6 text-gray-300 shadow-md hover:shadow-lg hover:bg-slate-800 transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
