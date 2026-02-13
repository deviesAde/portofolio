"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about-me" },
    { label: "Timeline", href: "#timeline" },
    { label: "Certificates", href: "#certificates" },
    { label: "Projects", href: "#projects" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Games", href: "#mini-games" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/80 dark:bg-[#030014]/90 backdrop-blur-xl border-b border-accent/20 py-2 shadow-[0_8px_32px_rgba(3,0,20,0.4)]"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="#"
              className="group relative text-2xl font-bold tracking-tighter"
            >
              <span className="text-black dark:text-white transition-colors duration-300 group-hover:text-purple-500">
                Devies
              </span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Ade
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"
                layoutId="logoUnderline"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-purple-500"
              >
                <span className="relative z-10">{link.label}</span>
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navHover"
                    className="absolute inset-0 bg-purple-500/10 dark:bg-purple-400/10 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}

            <div className="ml-4 pl-4 border-l border-purple-500/20">
              <Link
                href="#contact"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-purple-500/10 transition-colors focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-purple-500/20 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 rounded-xl text-lg font-medium text-foreground hover:text-purple-500 hover:bg-purple-500/5 transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 mt-4 border-t border-purple-500/10">
                <Link
                  href="#contact"
                  onClick={handleLinkClick}
                  className="block w-full text-center py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
