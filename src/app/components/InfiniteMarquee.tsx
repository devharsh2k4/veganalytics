"use client";

import React from "react";
import Image from "next/image";

const InfiniteMarquee: React.FC = () => {
  const logos = [
    "/astra.webp",
    "/langflow.webp",
    "/openai.webp",
    "/nvdia.webp",
    "/groq.webp",
    "/datastax.webp",
  ];

  return (
    <div className="bg-slate-950 py-10">
        <h1 className="text-center text-2xl md:text-2xl font-thin text-gray-300 mb-8">
        Powered by
      </h1>
      <div className="overflow-hidden relative">
        {/* Scrolling container */}
        <div className="flex animate-marquee space-x-10">
          {/* Render logos */}
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              height={128}
              width={128}
              alt={`Logo ${index}`}
              className="h-12 w-auto"
            />
          ))}
          {/* Duplicate logos for seamless scrolling */}
          {logos.map((logo, index) => (
            <Image
              key={`duplicate-${index}`}
              src={logo}
              height={128}
              width={128}
              alt={`Logo Duplicate ${index}`}
              className="h-12 w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
