"use client";

import React from "react";
import { Linkedin, Github } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Harsh Vardhan",
    role: "Full Stack Developer",
    image: "/harsh.jpeg",
    university: "RCET (2025)",
    linkedin: "https://linkedin.com/in/devharsh2k4",
    github: "https://github.com/devharsh2k4",
  },
  {
    name: "Vikash Pathak",
    role: "AI Developer",
    image: "/next.svg",
    university: "RCET (2025)",
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/",
  },
  {
    name: "Abhishek Rajan",
    role: "Frontend Developer",
    image: "/abhi.jpeg",
    university: "RCET (2025)",
    linkedin: "https://linkedin.com/in/abhishek-rajan-b6bb18230",
    github: "https://github.com/abhishek6299",
  },
  {
    name: "Lekha Kol",
    role: "Designer",
    image: "/next.svg",
    university: "RCET (2025)",
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/",
  },
];

const TeamSection: React.FC = () => {
  return (
    <div className="bg-slate-950 py-16">
      {/* Section Header */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-200 mb-4">
        Our Team
      </h2>
     

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:bg-slate-800 transition"
          >
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <Image
                src={member.image}
                height={600}
                width={600}
                alt={member.name}
                className="w-24 h-24 rounded-full ring-4 ring-blue-500 object-cover"
              />
            </div>
            {/* Name and Role */}
            <h3 className="text-lg font-semibold text-gray-200">
              {member.name}
            </h3>
            <p className="text-blue-400 text-sm font-medium">{member.role}</p>
            {/* University */}
            <p className="text-gray-400 text-xs mt-2">
              🎓 {member.university}
            </p>
            {/* Social Links */}
            <div className="flex justify-center items-center space-x-4 mt-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
