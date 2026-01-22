"use client";
import React, { useRef, useState, useEffect } from "react";
import { Star, Rocket, Cpu, Zap, Flame } from "lucide-react";
import Squares from "./squarebg";
import {
  SiLaravel,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiNodedotjs,
  SiTensorflow,
  SiTypescript,
  SiFirebase
} from "react-icons/si";

const techStack = [
  {
    name: "Laravel",
    level: 95,
    category: "Backend",
    icon: SiLaravel,
    color: "#FF2D20",
    expert: true,
  },
  {
    name: "Next.js",
    level: 90,
    category: "Framework",
    icon: SiNextdotjs,
    color: "#000000",
    expert: true,
  },
  {
    name: "React",
    level: 92,
    category: "Library",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Node.js",
    level: 85,
    category: "Runtime",
    icon: SiNodedotjs,
    color: "#339933",
  },
  {
    name: "TypeScript",
    level: 88,
    category: "Language",
    icon: SiTypescript,
    color: "#3178C6",
    expert: true,
  },
  {
    name: "Tailwind",
    level: 98,
    category: "CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    expert: true,
  },
  {
    name: "MySQL",
    level: 88,
    category: "Database",
    icon: SiMysql,
    color: "#4479A1",
  },
  {
    name: "JavaScript",
    level: 94,
    category: "Language",
    icon: SiJavascript,
    color: "#F7DF1E",
    expert: true,
  },
  {
    name: "PHP",
    level: 90,
    category: "Language",
    icon: SiPhp,
    color: "#777BB4",
  },
  {
    name: "Python",
    level: 80,
    category: "Language",
    icon: SiPython,
    color: "#3776AB",
  },
  {
    name: "ML",
    level: 75,
    category: "AI/ML",
    icon: SiTensorflow,
    color: "#FF6F00",
  },
  {
    name: "Firebase",
    level: 80,
    category: "Database",
    icon: SiFirebase,
    color: "#FFCA28",
  }
];

// Galaga particles component
const GalagaEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-galaga"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animationDuration: `${5 / particle.speed}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const TechStack = () => {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-[#fafafa] dark:bg-[#050505]"
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

      {/* Galaga Effect */}
      <GalagaEffect />

      {/* Custom cursor */}
      <div className={`fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] flex items-center justify-center p-0 m-0 transition-opacity duration-300 ${hoveredCard ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute h-12 w-[1px] bg-blue-500/50" />
        <div className="absolute w-12 h-[1px] bg-blue-500/50" />
        <div className="w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-4">
            <Rocket className="w-3 h-3" />
            <span>Tech Stack & Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Skills that <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Power</span> innovation
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto italic">
            "Building the future with cutting-edge technologies"
          </p>
          
        
          
        </div>

        {/* Square Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <SquareCard 
              key={tech.name} 
              tech={tech} 
              index={idx}
              onHover={setHoveredCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SquareCard = ({ tech, index, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(tech.name);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group aspect-square overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/50"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
      }}
    >
      {/* Spotlight Effect Overlay */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.1), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top section with icon */}
        <div className="flex justify-between items-start mb-3">
          <div className={`p-3 rounded-xl transition-all duration-500 shadow-sm border ${
            isHovered 
              ? 'scale-110 bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-blue-200 dark:border-blue-800' 
              : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200/50 dark:border-neutral-700/50'
          }`}>
            <tech.icon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-500" style={{ color: tech.color }} />
          </div>
          {tech.expert && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-1 rounded-full">
              <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
            </div>
          )}
        </div>

        {/* Middle section with name and category */}
        <div className="flex-1">
          <h3 className={`text-base font-bold transition-all duration-300 ${
            isHovered 
              ? 'text-blue-600 dark:text-blue-400 translate-x-1' 
              : 'text-neutral-800 dark:text-neutral-100'
          }`}>
            {tech.name}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-widest font-semibold mt-1">
            {tech.category}
          </p>
        </div>

        {/* Bottom section with minimal level indicator */}
        <div className="mt-auto pt-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i < Math.floor(tech.level / 25)
                      ? "bg-gradient-to-r from-blue-500 to-purple-600"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Minimal progress indicator */}
          <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
              style={{ 
                width: isHovered ? `${tech.level}%` : '0%',
                animation: isHovered ? 'widthGrow 1s ease-out forwards' : 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Galaga-style corner accents */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l transition-all duration-500 ${
        isHovered ? 'border-blue-500' : 'border-blue-500/30'
      }`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r transition-all duration-500 ${
        isHovered ? 'border-purple-500' : 'border-purple-500/30'
      }`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l transition-all duration-500 ${
        isHovered ? 'border-green-500' : 'border-green-500/30'
      }`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r transition-all duration-500 ${
        isHovered ? 'border-yellow-500' : 'border-yellow-500/30'
      }`} />

      {/* Retro pixel effect on hover */}
      <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>
    </div>
  );
};

export default TechStack;

// Tambahkan style untuk animasi
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes widthGrow {
    from {
      width: 0%;
    }
    to {
      width: var(--target-width, 100%);
    }
  }
  
  @keyframes galaga {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  
  .animate-galaga {
    animation: galaga linear infinite;
  }
`;

// Inject styles ke dalam document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}