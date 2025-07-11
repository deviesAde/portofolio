"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import { Magnet } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

/**
 * @typedef {Object} Btn03Props
 * @property {number} [particleCount]
 * @property {number} [attractRadius]
 */

export default function Btn03({
  className,
  particleCount = 16,
  attractRadius = 60,
  ...props
}) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 400 - 200, // Increased range
      y: Math.random() * 400 - 200,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  return (
    <Button
      className={cn(
        "min-w-48 h-12 relative touch-none", // Increased size
        "bg-gradient-to-r from-purple-200 to-violet-300 dark:from-purple-900 dark:to-violet-800",
        "hover:from-purple-300 hover:to-violet-400 dark:hover:from-purple-800 dark:hover:to-violet-700",
        "text-violet-700 dark:text-violet-200",
        "border border-violet-300/50 dark:border-violet-700/50",
        "transition-all duration-300",
        "text-lg", // Larger text
        className
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "absolute w-2 h-2 rounded-full", // Larger particles
            "bg-violet-500 dark:bg-violet-300",
            "transition-opacity duration-300",
            isAttracting ? "opacity-100" : "opacity-40"
          )}
        />
      ))}
      <span className="relative w-full flex items-center justify-center gap-3">
        {" "}
      
        <Magnet
          className={cn(
            "w-5 h-5 transition-transform duration-300", // Larger icon
            isAttracting && "scale-110"
          )}
        />
        {isAttracting ? "GOO" : "Get in Touch"}
      </span>
    </Button>
  );
}
