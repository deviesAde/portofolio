"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MultilingualLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(0);
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
    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % greetings.length);
    }, 800);

    const loadingTimeout = setTimeout(() => {
      clearInterval(languageInterval);
      setIsLoading(false);
    }, greetings.length * 800 + 500);

    return () => {
      clearInterval(languageInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8 overflow-hidden"
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
                  className={`absolute rounded-full bg-purple-400`}
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
                <div className="absolute -inset-4 bg-purple-100 rounded-full blur-md opacity-70" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-200 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
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

              <div className="text-center space-y-2">
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
                <p className="text-gray-600 text-lg">
                  {greetings[currentLanguage].language}
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 text-sm absolute bottom-10"
            >
              Preparing your experience...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && children}
    </>
  );
};

export default MultilingualLoader;
