"use client";

import { useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

const MorphingDownloadButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const controls = useAnimation();
  const buttonRef = useRef(null); // Removed HTMLButtonElement type

  const handleDownload = () => {
    setIsDownloading(true);

    // Simulate download process
    controls.start("downloading");

    setTimeout(() => {
      setIsDownloading(false);
      setIsComplete(true);
      controls.start("complete");

      // Trigger actual download
      const link = document.createElement("a");
      link.href = "/RESUME_DEVIES_ADE.pdf";
      link.download = "RESUME_DEVIES_ADE.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsComplete(false);
        controls.start("initial");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center">
      <motion.button
        ref={buttonRef}
        className="relative overflow-hidden h-14 bg-accent/10 backdrop-blur-md px-8 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm text-foreground border border-accent/40 hover:border-accent shadow-[0_8px_32px_rgba(3,0,20,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-500 focus:outline-none"
        initial="initial"
        animate={controls}
        variants={{
          initial: {
            background: "rgba(168, 85, 247, 0.1)",
            scale: 1,
          },
          downloading: {
            background: "#a855f7",
            scale: 0.95,
            transition: { duration: 0.3 },
          },
          complete: {
            background: "#10b981",
            scale: 1,
            borderRadius: "9999px",
          },
        }}
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleDownload}
        disabled={isDownloading || isComplete}
      >
        {/* Background shine effect */}
        <motion.div
          className="absolute inset-0 bg-white opacity-20"
          initial={{ x: -100 }}
          animate={{
            x: isHovered ? 400 : -100,
            transition: { duration: 1.5, repeat: Infinity },
          }}
        />

        {/* Main content */}
        <div className="relative z-10 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {!isDownloading && !isComplete && (
              <motion.span
                key="download-text"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Download CV
              </motion.span>
            )}

            {isDownloading && (
              <motion.span
                key="downloading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Preparing...
              </motion.span>
            )}

            {isComplete && (
              <motion.span
                key="complete-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Download Complete!
              </motion.span>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              rotate: isDownloading ? 360 : 0,
              transition: {
                rotate: {
                  duration: 1,
                  repeat: isDownloading ? Infinity : 0,
                  ease: "linear",
                },
              },
            }}
          >
            {isComplete ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <Download size={20} />
            )}
          </motion.div>
        </div>

        {/* Download progress bar (shown during download) */}
        {isDownloading && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/50"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default MorphingDownloadButton;
