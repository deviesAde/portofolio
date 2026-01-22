"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Link2, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialButton({ className, ...props }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Replace these URLs with your actual social media profiles
  const socialButtons = [
    // {
    //   icon: Facebook,
    //   label: "Facebook",
    //   color: "bg-[#1877F2] hover:bg-[#166FE5]",
    //   url: "https://facebook.com/devies.ade",
    //   shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    //     window.location.href
    //   )}`,
    // },
    {
      icon: Instagram,
      label: "Instagram",
      color: "bg-[#E4405F] hover:bg-[#D42D5C]",
      url: "https://instagram.com/deviesadee",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      color: "bg-[#0A66C2] hover:bg-[#0958AD]",
      url: "https://linkedin.com/in/deviesade",
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`,
    },
    {
      icon: Link2,
      label: "Copy Link",
      url: "https://github.com/deviesAde",
      color: "bg-[#8A2BE2] hover:bg-[#7B1FA2]",
    },
  ];

  const handleAction = (index, event) => {
    event.preventDefault();
    setActiveIndex(index);

    const button = socialButtons[index];

    if (index === 3) {
      // Copy link functionality
      navigator.clipboard.writeText(window.location.href);
    } else if (event.metaKey || event.ctrlKey || event.shiftKey) {
      // Open in new tab if modifier key is pressed
      window.open(button.shareUrl || button.url, "_blank");
    } else {
      // Default behavior (for demo purposes)
      window.location.href = button.shareUrl || button.url;
    }

    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div
      className="relative h-14 w-full min-w-[200px]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Main Button */}
      <motion.div
        className="absolute top-0 left-0 w-full"
        animate={{
          opacity: isExpanded ? 0 : 1,
          x: isExpanded ? -20 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <Button
          className={cn(
            "h-14 w-full",
            "bg-gradient-to-r from-purple-600 to-blue-500",
            "hover:from-purple-700 hover:to-blue-600",
            "text-white text-lg",
            "border border-purple-400/30",
            "transition-all duration-200",
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-3">
            <Share2 className="w-5 h-5" />
            Let's Connect
          </span>
        </Button>
      </motion.div>

      {/* Expanded Social Buttons */}
      <motion.div
        className="absolute top-0 left-0 flex h-14"
        animate={{
          width: isExpanded ? "100%" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {socialButtons.map((button, index) => (
          <motion.a
            key={button.label}
            href={index === 3 ? "#" : button.shareUrl || button.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleAction(index, e)}
            className={cn(
              "h-14 w-full flex items-center justify-center",
              button.color,
              "text-white",
              index === 0 && "rounded-l-lg",
              index === socialButtons.length - 1 && "rounded-r-lg",
              "border-r border-white/20 last:border-r-0",
              "overflow-hidden relative",
              "transition-colors duration-200"
            )}
            animate={{
              opacity: isExpanded ? 1 : 0,
              x: isExpanded ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              delay: isExpanded ? index * 0.05 : 0,
            }}
          >
            <motion.div
              animate={{
                scale: activeIndex === index ? 0.85 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <button.icon className="w-5 h-5" />
            </motion.div>
            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
