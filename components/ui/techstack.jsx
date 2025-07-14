"use client";
import { motion } from "framer-motion";
import {  Star, Rocket } from "lucide-react";
import Squares from "./squarebg";

const TechStack = () => {
  const techStack = [
    {
      name: "Laravel",
      level: 90,
      category: "Backend",
      icon: "🛠️",
      since: "2020",
      expert: true,
    },
    {
      name: "MySQL",
      level: 85,
      category: "Database",
      icon: "🗃️",
      since: "2019",
      expert: true,
    },
    {
      name: "React",
      level: 80,
      category: "Frontend",
      icon: "⚛️",
      since: "2021",
      expert: true,
    },
    {
      name: "Next.js",
      level: 75,
      category: "Fullstack",
      icon: "🚀",
      since: "2022",
    },
    {
      name: "PHP",
      level: 85,
      category: "Backend",
      icon: "🐘",
      since: "2019",
      expert: true,
    },
    {
      name: "JavaScript",
      level: 80,
      category: "Frontend",
      icon: "📜",
      since: "2018",
      expert: true,
    },
    {
      name: "Python",
      level: 70,
      category: "Backend",
      icon: "🐍",
      since: "2021",
    },
    {
      name: "MongoDB",
      level: 65,
      category: "Database",
      icon: "🍃",
      since: "2022",
    },
    {
      name: "HTML/CSS",
      level: 95,
      category: "Frontend",
      icon: "🎨",
      since: "2017",
      expert: true,
    },
    {
      name: "Machine Learning",
      level: 60,
      category: "AI",
      icon: "🧠",
      since: "2023",
    },
  ];

  // Sort by skill level (descending)
  const sortedTech = [...techStack].sort((a, b) => b.level - a.level);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Squares Background */}
      <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-[0.03]">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#888"
          hoverFillColor="#222"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Tech Stack
            </span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Ranked by proficiency and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sortedTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col ${
                tech.expert
                  ? "ring-1 ring-blue-500/20 dark:ring-blue-400/20"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{tech.icon}</span>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {tech.name}
                  </h3>
                </div>
                {index < 3 && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                    #{index + 1}
                  </span>
                )}
              </div>

              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{tech.category}</span>
                  <span>{tech.since}</span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-2 rounded-full ${
                      tech.level >= 80
                        ? "bg-green-500"
                        : tech.level >= 60
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {tech.level}% mastery
                  </span>
                  {tech.expert && (
                    <Star className="text-yellow-500 text-xs" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 backdrop-blur-sm">
            <Rocket className="mr-2 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Specializing in Laravel, React & Next.js
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
