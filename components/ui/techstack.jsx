"use client";
import React, { useRef, useState, useEffect } from "react";
import { Star, Rocket, Cpu, Zap, Flame } from "lucide-react";
import Squares from "./squarebg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);
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
  const cardsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const ctx = gsap.context(() => {
      gsap.fromTo(".tech-card-trigger",
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className="w-3 h-3" />
            <span>Capability Deck</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
            TECH <span className="text-accent italic font-light drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">STACK</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base border-t border-accent/10 pt-6">
            "Technologies and tools used across my software and AI projects."
          </p>
        </div>

        {/* Square Grid Layout */}
        <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <div key={tech.name} className="tech-card-trigger">
              <Magnetic>
                <SquareCard
                  tech={tech}
                  index={idx}
                />
              </Magnetic>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SquareCard = ({ tech, index }) => {
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
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group aspect-square overflow-hidden border border-foreground/5 bg-card/30 backdrop-blur-md p-6 flex flex-col justify-between cursor-crosshair transition-all duration-500 hover:border-accent/30 rounded-none shadow-sm h-full w-full"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.1), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top section */}
        <div className="flex justify-between items-start">
          <div className={`p-3 border transition-all duration-700 ${isHovered
            ? 'bg-accent/10 border-accent/40 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
            : 'bg-muted/30 border-foreground/5'
            }`}>
            <tech.icon className="w-6 h-6 transition-colors duration-700" style={{ color: isHovered ? '#a855f7' : tech.color }} />
          </div>
          {tech.expert && (
            <div className="text-[10px] font-mono text-accent/40 font-bold uppercase tracking-widest hidden group-hover:block blur-none">
              Level.EX
            </div>
          )}
        </div>

        {/* Bottom content */}
        <div className="mt-auto">
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em] mb-1">
            {tech.category}
          </p>
          <h3 className={`text-lg font-bold tracking-tight transition-all duration-500 ${isHovered
            ? 'text-accent translate-x-1'
            : 'text-foreground'
            }`}>
            {tech.name}
          </h3>

          <div className="h-0.5 w-full bg-foreground/[0.03] mt-4 overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-1000 ease-out"
              style={{
                width: isHovered ? `${tech.level}%` : '4px',
              }}
            />
          </div>
        </div>
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