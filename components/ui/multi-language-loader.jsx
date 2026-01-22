"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MultilingualLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  // Create purple particles
  useEffect(() => {
    const particlesArray = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.2 + 0.05,
    }));
    setParticles(particlesArray);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!isLoading) return;

    const moveParticles = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: (p.y + p.speed) % 100,
        }))
      );
    };

    const interval = setInterval(moveParticles, 50);
    return () => clearInterval(interval);
  }, [isLoading]);

  const greetings = [
    { language: "English", text: "Hello!", color: "text-purple-600" },
    { language: "Indonesian", text: "Halo!", color: "text-purple-500" },
    { language: "Japanese", text: "こんにちは!", color: "text-fuchsia-600" },
    { language: "Spanish", text: "¡Hola!", color: "text-violet-600" },
    { language: "French", text: "Bonjour!", color: "text-indigo-600" },
    { language: "Arabic", text: "مرحبا!", color: "text-purple-700" },
    { language: "Portuguese", text: "Olá!", color: "text-fuchsia-500" },
  ];

  useEffect(() => {
    let languageInterval;
    let progressInterval;
    let loadingTimeout;

  
    const totalDuration = greetings.length * 800 + 500;
    const progressStep = 100 / (totalDuration / 50); 

    progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + progressStep, 100);
      });
    }, 50);

   
    languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % greetings.length);
    }, 800);


    loadingTimeout = setTimeout(() => {
      clearInterval(languageInterval);
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setIsLoading(false);
      
      
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }, totalDuration);

    return () => {
      clearInterval(languageInterval);
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden"
          >
            {/* Purple Particles Background */}
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{
                    x: `${particle.x}vw`,
                    y: `${particle.y}vh`,
                    opacity: particle.opacity,
                  }}
                  animate={{
                    y: `${particle.y}vh`,
                  }}
                  transition={{ duration: 0 }}
                  className={`absolute rounded-full bg-purple-400 dark:bg-purple-600`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2,
              }}
            >
              <div className="mb-8 relative">
                <div className="absolute -inset-4 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-md opacity-70" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10 border-2 border-purple-200 dark:border-purple-700/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-6">
                <motion.h2
                  key={currentLanguage}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-4xl md:text-5xl font-bold ${greetings[currentLanguage].color}`}
                >
                  {greetings[currentLanguage].text}
                </motion.h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {greetings[currentLanguage].language}
                </p>
                
                {/* Loading Progress */}
                <div className="w-64 space-y-2">
                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  
                  {/* Progress Percentage */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Loading...
                    </span>
                    <motion.span
                      key={loadingProgress}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-lg font-bold text-purple-600 dark:text-purple-400"
                    >
                      {Math.round(loadingProgress)}%
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loading Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-16 space-y-1 text-center"
            >
              <div className="flex justify-center space-x-2">
                {[
                  "Initializing...",
                  "Loading assets...",
                  "Preparing interface...",
                  "Almost ready...",
                ].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: loadingProgress > (index + 1) * 25 ? 1 : 0.3,
                    }}
                    className={`text-xs ${
                      loadingProgress > (index + 1) * 25
                        ? "text-purple-600 dark:text-purple-400 font-medium"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {loadingProgress > (index + 1) * 25 ? "✓" : "○"} {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 dark:text-gray-600 text-sm absolute bottom-8"
            >
              Preparing your experience...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default MultilingualLoader;