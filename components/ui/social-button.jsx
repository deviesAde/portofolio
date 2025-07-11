"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Link } from "lucide-react";
import { motion } from "motion/react";

export default function SocialButton({ className, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const shareButtons = [
    {
      icon: Facebook,
      label: "Share on Facebook",
      color: "bg-[#5865F2] hover:bg-[#4752C4]",
    },
    {
      icon: Instagram,
      label: "Share on Instagram",
      color: "bg-[#C13584] hover:bg-[#A72F73]",
    },
    {
      icon: Linkedin,
      label: "Share on LinkedIn",
      color: "bg-[#0A66C2] hover:bg-[#0958AD]",
    },
    {
      icon: Link,
      label: "Copy link",
      color: "bg-[#8A2BE2] hover:bg-[#7B1FA2]",
    },
  ];

  const handleShare = (index) => {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        animate={{
          opacity: isVisible ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <Button
          className={cn(
            "min-w-48 h-12 relative", // Increased size
            "bg-gradient-to-r from-purple-600 to-blue-500",
            "hover:from-purple-700 hover:to-blue-600",
            "text-white",
            "border border-purple-400/30",
            "transition-colors duration-200",
            "text-lg", // Larger text
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-3">
            {" "}
            {/* Increased gap */}
            <Link className="w-5 h-5" /> {/* Larger icon */}
            Lets Connect
          </span>
        </Button>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 flex h-12 overflow-hidden" // Increased height
        animate={{
          width: isVisible ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {shareButtons.map((button, i) => (
          <motion.button
            type="button"
            key={`share-${button.label}`}
            aria-label={button.label}
            onClick={() => handleShare(i)}
            className={cn(
              "h-12", // Increased height
              "w-12", // Increased width
              "flex items-center justify-center",
              button.color,
              "text-white",
              i === 0 && "rounded-l-lg", // Larger rounded corners
              i === 3 && "rounded-r-lg",
              "border-r border-white/20 last:border-r-0",
              "outline-none",
              "relative overflow-hidden",
              "transition-colors duration-200"
            )}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
          >
            <motion.div
              className="relative z-10"
              animate={{
                scale: activeIndex === i ? 0.85 : 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <button.icon className="w-5 h-5" /> {/* Larger icon */}
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeIndex === i ? 0.3 : 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
