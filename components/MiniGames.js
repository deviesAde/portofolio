"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Trophy } from "lucide-react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];
const INITIAL_DIRECTION = "UP";
const SPEED = 150;

const MiniGames = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [logs, setLogs] = useState(["SYSTEM INITIALIZED...", "AWAITING PLAYER..."]);

    const gameLoopRef = useRef();

    const addLog = (msg) => {
        setLogs(prev => [msg, ...prev].slice(0, 5));
    };

    const generateFood = useCallback(() => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
            if (!isOnSnake) break;
        }
        setFood(newFood);
    }, [snake]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setIsGameOver(false);
        setScore(0);
        setIsPaused(false);
        generateFood();
        addLog("NEW SESSION STARTED");
    };

    const moveSnake = useCallback(() => {
        if (isGameOver || isPaused) return;

        setSnake((prevSnake) => {
            const head = { ...prevSnake[0] };

            switch (direction) {
                case "UP": head.y -= 1; break;
                case "DOWN": head.y += 1; break;
                case "LEFT": head.x -= 1; break;
                case "RIGHT": head.x += 1; break;
                default: break;
            }

            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setIsGameOver(true);
                addLog("CRITICAL COLLISION: WALL");
                return prevSnake;
            }

            if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
                setIsGameOver(true);
                addLog("CRITICAL COLLISION: SELF");
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            if (head.x === food.x && head.y === food.y) {
                setScore((s) => {
                    const newScore = s + 10;
                    if (newScore > highScore) setHighScore(newScore);
                    return newScore;
                });
                generateFood();
                addLog("DATA PACKET COLLECTED +10");
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, isGameOver, isPaused, generateFood, highScore]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case "ArrowUp": if (direction !== "DOWN") setDirection("UP"); break;
                case "ArrowDown": if (direction !== "UP") setDirection("DOWN"); break;
                case "ArrowLeft": if (direction !== "RIGHT") setDirection("LEFT"); break;
                case "ArrowRight": if (direction !== "LEFT") setDirection("RIGHT"); break;
                case " ":
                    setIsPaused(prev => {
                        const newVal = !prev;
                        addLog(newVal ? "EXECUTION PAUSED" : "RESUMING EXECUTION...");
                        return newVal;
                    });
                    break;
                default: break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [direction]);

    useEffect(() => {
        gameLoopRef.current = setInterval(moveSnake, SPEED);
        return () => clearInterval(gameLoopRef.current);
    }, [moveSnake]);

    return (
        <div className="w-full flex flex-col items-center py-20 px-4 bg-background relative overflow-hidden">
            {/* Decorative Arcade Background Text */}
            <div className="absolute top-10 left-10 text-9xl font-black text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter leading-none italic">
                Arcade<br />Zone
            </div>
            <div className="absolute bottom-10 right-10 text-9xl font-black text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter leading-none italic text-right">
                Snake<br />Protocol
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Sidebar - Terminal Logs */}
                <div className="hidden lg:flex flex-col col-span-3 gap-4 h-full">
                    <div className="bg-[#050510] border border-accent/20 rounded-xl p-4 h-[350px] flex flex-col shadow-lg shadow-accent/5">
                        <div className="flex items-center gap-2 mb-4 border-b border-accent/10 pb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">System Log</span>
                        </div>
                        <div className="flex-1 space-y-3 overflow-hidden font-mono text-[10px]">
                            <AnimatePresence mode="popLayout">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={log + i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-muted-foreground/80 leading-tight border-l border-accent/20 pl-2"
                                    >
                                        <span className="text-accent/40 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                        {log}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="mt-4 pt-2 border-t border-accent/10">
                            <div className="text-[8px] text-muted-foreground uppercase tracking-widest text-center animate-pulse">Core Process Active</div>
                        </div>
                    </div>

                    <div className="bg-[#1a1a2e]/30 border border-accent/10 rounded-xl p-4">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Node Stats</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px]">
                                <span className="text-muted-foreground">Version</span>
                                <span className="text-accent">ARC-77</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                                <span className="text-muted-foreground">Encryption</span>
                                <span className="text-green-500">AES-256</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center - Main Game */}
                <div className="col-span-1 lg:col-span-6">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <Gamepad2 className="text-accent" size={32} />
                            <h2 className="text-4xl font-bold tracking-tighter">RETRO ARCADE</h2>
                        </div>
                        <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] animate-pulse">INSERT COIN TO CONTINUE</p>
                    </div>

                    {/* Game Container */}
                    <div className="relative aspect-square w-full bg-[#050510] border-2 border-accent/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                        {/* CRT Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
                            <div className="absolute top-0 left-0 w-full h-[100px] bg-white/[0.05] blur-[50px] animate-scanline" />
                        </div>

                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
                            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
                        }} />

                        {/* Render Snake */}
                        {snake.map((segment, i) => (
                            <div
                                key={i}
                                className={`absolute rounded-sm transition-all duration-100 ${i === 0 ? 'bg-accent shadow-[0_0_15px_#a855f7]' : 'bg-accent/80'}`}
                                style={{
                                    width: `${100 / GRID_SIZE}%`,
                                    height: `${100 / GRID_SIZE}%`,
                                    left: `${(segment.x * 100) / GRID_SIZE}%`,
                                    top: `${(segment.y * 100) / GRID_SIZE}%`,
                                    opacity: 1 - (i / snake.length) * 0.5,
                                    zIndex: snake.length - i
                                }}
                            >
                                {i === 0 && (
                                    <div className="absolute inset-0 bg-white/40 blur-[2px] rounded-full animate-pulse" />
                                )}
                            </div>
                        ))}

                        {/* Render Food */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute bg-white flex items-center justify-center rounded-sm shadow-[0_0_15px_#ffffff]"
                            style={{
                                width: `${100 / GRID_SIZE}%`,
                                height: `${100 / GRID_SIZE}%`,
                                left: `${(food.x * 100) / GRID_SIZE}%`,
                                top: `${(food.y * 100) / GRID_SIZE}%`,
                            }}
                        >
                            <div className="w-1/2 h-1/2 bg-accent rounded-full animate-pulse" />
                        </motion.div>

                        {/* Game Over / Start Overlay */}
                        <AnimatePresence>
                            {(isGameOver || isPaused) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
                                >
                                    {isGameOver ? (
                                        <motion.div
                                            className="text-center p-8 border-2 border-red-500/20 bg-red-500/5 rounded-2xl"
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                        >
                                            <h3 className="text-6xl font-black text-red-500 mb-2 italic tracking-tighter shadow-red-500/50 drop-shadow-2xl">FAILURE</h3>
                                            <p className="text-muted-foreground mb-8 text-xs uppercase tracking-[0.5em] font-mono">Kernel Panic: Memory Leak Detected</p>
                                            <button
                                                onClick={resetGame}
                                                className="group flex items-center gap-3 px-10 py-4 bg-accent text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)] mx-auto"
                                            >
                                                <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                                                REBOOT SYSTEM
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className="text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <div className="w-24 h-24 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_#a855f7]" />
                                            <button
                                                onClick={() => {
                                                    setIsPaused(false);
                                                    addLog("SYSTEM RESUMED");
                                                }}
                                                className="px-10 py-4 bg-accent text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                                            >
                                                INITIALIZE SESSION
                                            </button>
                                            <p className="text-[10px] text-muted-foreground mt-6 uppercase tracking-[0.4em] font-mono animate-pulse">Awaiting hardware input...</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-[#050510] border-2 border-accent/20 p-4 rounded-xl flex items-center justify-between shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Score</span>
                            <span className="text-3xl font-mono text-accent font-black tracking-tighter drop-shadow-[0_0_10px_#a855f7]">{score.toString().padStart(4, '0')}</span>
                        </div>
                        <div className="bg-[#050510] border-2 border-accent/20 p-4 rounded-xl flex items-center justify-between shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                            <div className="flex items-center gap-2">
                                <Trophy size={14} className="text-accent" />
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Record</span>
                            </div>
                            <span className="text-3xl font-mono text-white font-black tracking-tighter">{highScore.toString().padStart(4, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Instructions & Achievements */}
                <div className="hidden lg:flex flex-col col-span-3 gap-4 h-full">
                    <div className="bg-[#050510] border border-accent/20 rounded-xl p-5 shadow-lg">
                        <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4 border-b border-accent/10 pb-2">Manual</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#1a1a2e] border border-accent/20 rounded-lg flex items-center justify-center text-[10px] font-bold">KBD</div>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Movement via Arrow Keys</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#1a1a2e] border border-accent/20 rounded-lg flex items-center justify-center text-[10px] font-bold">SPC</div>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Toggle Execution</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#050510] border border-accent/20 rounded-xl p-5 shadow-lg flex-1">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-4">Core Achievements</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 py-2 border-b border-white/5 opacity-40 grayscale">
                                <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">01</div>
                                <div className="text-[9px] uppercase font-bold tracking-widest">Snake Master</div>
                            </div>
                            <div className="flex items-center gap-3 py-2 border-b border-white/5 opacity-40 grayscale">
                                <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">02</div>
                                <div className="text-[9px] uppercase font-bold tracking-widest">Data Collector</div>
                            </div>
                        </div>
                        <p className="text-[8px] text-accent/50 mt-6 uppercase tracking-[0.2em] text-center font-bold">Connect GitHub to unlock</p>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="grid grid-cols-3 gap-3 mt-10 md:hidden pb-10 col-span-1 mx-auto w-full max-w-[280px]">
                    <div />
                    <ControlButton icon={<ChevronUp />} onClick={() => direction !== "DOWN" && setDirection("UP")} />
                    <div />
                    <ControlButton icon={<ChevronLeft />} onClick={() => direction !== "RIGHT" && setDirection("LEFT")} />
                    <div />
                    <ControlButton icon={<ChevronRight />} onClick={() => direction !== "LEFT" && setDirection("RIGHT")} />
                    <div />
                    <ControlButton icon={<ChevronDown />} onClick={() => direction !== "UP" && setDirection("DOWN")} />
                    <div />
                </div>
            </div>

            <style jsx global>{`
        @keyframes scanline {
          0% { top: -100px; }
          100% { top: 100%; }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
      `}</style>
        </div>
    );
};

const ControlButton = ({ icon, onClick }) => (
    <button
        onClick={onClick}
        className="aspect-square flex items-center justify-center bg-[#1a1a2e] border border-accent/20 rounded-xl active:bg-accent active:text-white transition-all shadow-lg active:shadow-[0_0_20px_#a855f7] text-accent"
    >
        {React.cloneElement(icon, { size: 32 })}
    </button>
);

export default MiniGames;
