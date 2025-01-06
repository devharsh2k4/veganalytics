import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-slate-950 text-white py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <div className="flex items-center space-x-4 mb-6">
            <button className="bg-blue-500 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-600">
              Powered by LangFlow
            </button>
            <button className="bg-blue-500 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-600">
              Powered by DataStax
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
            <button className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-600">
              Get Started →
            </button>
            <button className="bg-gray-700 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-gray-800">
              View Demo
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/hero.png"
              height={420}
              width={280}
              alt="Dashboard Preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="container mx-auto px-6 lg:px-20 mt-12 text-center">
        <p className="text-gray-400">
          <span className="font-bold text-white">200+</span> satisfied users
        </p>
      </div>
    </section>
  );
};

export default Hero;
