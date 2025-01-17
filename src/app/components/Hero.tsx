"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";

const Hero: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/visualize");
  };

  const handleChatNavigation = () => {
    router.push("/chat");
  };

  return (
    <section className="bg-slate-950 text-white py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <div className="flex items-center space-x-4 mb-6">
            <button className="flex items-center bg-transparent text-white py-1 px-4 rounded-full border text-sm hover:bg-blue-600">
              <Lightbulb className="h-4 w-4 mr-2" />
              Powered by Langflow & DataStax
            </button>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
            Transform Your{" "}
            <span className="text-blue-400">Social Media Strategy</span>
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Unlock powerful insights with AI-driven analytics to boost your
            social media engagement and grow your audience organically.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleGetStarted}
              className="bg-transparent border text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-blue-600"
            >
              Get Started →
            </button>
            <button
              onClick={handleChatNavigation}
              className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-blue-600"
            >
              Chat →
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/hero.png"
              height={620}
              width={480}
              alt="Dashboard Preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
