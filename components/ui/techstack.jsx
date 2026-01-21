"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Rocket } from "lucide-react";
import Squares from "./squarebg";
import {
  SiLaravel,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiJavascript,
  SiPython,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFramer,
  SiVite, SiNodedotjs
} from "react-icons/si";

const techStack = [
  {
    name: "Laravel",
    level: 95,
    category: "Mastery",
    icon: SiLaravel,
    color: "#FF2D20",
    size: "col-span-2 row-span-2",
    since: "2019",
    expert: true,
  },
  {
    name: "Next.js",
    level: 90,
    category: "Core",
    icon: SiNextdotjs,
    color: "#000000",
    size: "col-span-2",
    since: "2021",
    expert: true,
  },
  {
    name: "React",
    level: 92,
    category: "Library",
    icon: SiReact,
    color: "#61DAFB",
    size: "col-span-1",
    since: "2020",
  },
  {
    name: "Node.js",
    level: 85,
    category: "Runtime",
    icon: SiNodedotjs,
    color: "#339933",
    size: "col-span-1",
    since: "2021",
  },
  {
    name: "Tailwind",
    level: 98,
    category: "Style",
    icon: SiTailwindcss,
    color: "#06B6D4",
    size: "col-span-1",
    since: "2020",
    expert: true,
  },
  {
    name: "MySQL",
    level: 88,
    category: "Database",
    icon: SiMysql,
    color: "#4479A1",
    size: "col-span-1",
    since: "2019",
  },
  {
    name: "JavaScript",
    level: 94,
    category: "Language",
    icon: SiJavascript,
    color: "#F7DF1E",
    size: "col-span-2",
    since: "2018",
    expert: true,
  },
  {
    name: "PHP",
    level: 90,
    category: "Language",
    icon: SiPhp,
    color: "#777BB4",
    size: "col-span-1",
    since: "2018",
  },
  {
    name: "Python",
    level: 80,
    category: "Language",
    icon: SiPython,
    color: "#3776AB",
    size: "col-span-1",
    since: "2021",
  },
  {
    name: "MongoDB",
    level: 75,
    category: "Database",
    icon: SiMongodb,
    color: "#47A248",
    size: "col-span-1",
    since: "2022",
  },
  {
    name: "Framer",
    level: 85,
    category: "Motion",
    icon: SiFramer,
    color: "#0055FF",
    size: "col-span-1",
    since: "2022",
  }
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the crosshair cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHoveringSection, setIsHoveringSection] = useState(false);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
      className="py-24 relative overflow-hidden bg-[#fafafa] dark:bg-[#050505] cursor-none"
    >
      {/* Background Squares */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <Squares
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="#888888"
          hoverFillColor="#222"
        />
      </div>

      {/* Floating Crosshair Cursor */}
      {isHoveringSection && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] flex items-center justify-center p-0 m-0"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {/* Vertical Line */}
          <div className="absolute h-12 w-[1px] bg-blue-500/50" />
          {/* Horizontal Line */}
          <div className="absolute w-12 h-[1px] bg-blue-500/50" />
          {/* Center Dot */}
          <div className="w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-4">
            <Rocket className="w-3 h-3" />
            <span>Tech Stack & Proficiency</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Skills that <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Power</span> my work
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto italic">
            "A craftsman is only as good as his tools. These are mine."
          </p>
        </motion.div>

        {/* Magic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-fr">
          {techStack.map((tech, idx) => (
            <BentoCard key={tech.name} tech={tech} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ tech, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  function onMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm p-6 flex flex-col justify-between ${tech.size} cursor-pointer`}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
      }}
    >
      {/* Spotlight Effect Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(37,99,235,0.08), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-neutral-200/50 dark:border-neutral-700/50">
            <tech.icon className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-500" style={{ color: tech.color }} />
          </div>
          {tech.expert && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-1.5 rounded-full">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:translate-x-1 transition-transform duration-300">
            {tech.name}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-widest font-semibold mt-1">
            {tech.category}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-neutral-100 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
            {tech.level}%
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono">
            Est. {tech.since}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${tech.level}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
      </div>

      {/* Decorative Gradient Glow on Hover */}
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/10 dark:bg-blue-400/5 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
    </motion.div>
  );
};

export default TechStack;
