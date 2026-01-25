"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from 'emailjs-com';

const GetInTouch = () => {
    const [history, setHistory] = useState([
        { type: "system", content: "Terminal system ready. Initializing connection..." },
        { type: "system", content: 'Type your message or follow the instructions below.' },
    ]);

    const [input, setInput] = useState("");
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);


    const EMAILJS_CONFIG = {
        SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        USER_ID: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    };


    useEffect(() => {
        if (EMAILJS_CONFIG.USER_ID) {
            emailjs.init(EMAILJS_CONFIG.USER_ID);
        }
    }, [EMAILJS_CONFIG.USER_ID]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const addToHistory = (entry) => {
        setHistory(prev => [...prev, entry]);
    };

    const handleCommand = async (e) => {
        e.preventDefault();
        if (!input.trim() || isSending) return;

        const val = input.trim();
        addToHistory({ type: "user", content: val });
        setInput("");

        if (val.toLowerCase() === "clear") {
            setHistory([{ type: "system", content: "Terminal cleared." }]);
            setStep(0);
            return;
        }

        if (val.toLowerCase() === "help") {
            addToHistory({ type: "system", content: "Commands: clear, help." });
            return;
        }

        // Form Flow
        if (step === 0) {
            setFormData(prev => ({ ...prev, name: val }));
            addToHistory({ type: "system", content: `Hello ${val}! Please enter your email address:` });
            setStep(1);
        } else if (step === 1) {
            if (!val.includes("@") || !val.includes(".")) {
                addToHistory({ type: "error", content: "Invalid email format. Please try again." });
            } else {
                setFormData(prev => ({ ...prev, email: val }));
                addToHistory({ type: "system", content: "Email received. What message would you like to send?" });
                setStep(2);
            }
        } else if (step === 2) {
            const currentMessage = val;
            setFormData(prev => ({ ...prev, message: currentMessage }));
            addToHistory({ type: "system", content: "Sending message..." });
            setIsSending(true);
            setStep(3);


            if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.USER_ID) {
                console.error("EmailJS Config Missing:", EMAILJS_CONFIG);
                addToHistory({ type: "error", content: "Konfigurasi EmailJS tidak lengkap. Cek environment variables." });
                setIsSending(false);
                setStep(2);
                return;
            }

            try {
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: currentMessage,
                    to_email: "irawandevies@gmail.com"
                };

                const result = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams,
                    EMAILJS_CONFIG.USER_ID
                );

                console.log("EmailJS Success:", result.text);
                addToHistory({ type: "success", content: "Message sent successfully to irawandevies@gmail.com!" });
                addToHistory({ type: "system", content: "Thank you for reaching out. Type 'clear' to send a new message." });
                setStep(4);
            } catch (error) {

                console.error("Full EmailJS Error:", error);

                let errorDetail = "Kesalahan tidak diketahui";
                if (error && typeof error === 'object') {
                    try {

                        errorDetail = error.text || error.message || JSON.stringify(error);
                        if (errorDetail === "{}") errorDetail = "Blocked or Empty Response (Check Ad-blocker)";
                    } catch (e) {
                        errorDetail = String(error);
                    }
                }

                addToHistory({ type: "error", content: `Gagal mengirim: ${errorDetail}` });
                addToHistory({ type: "system", content: "💡 Tip: Pastikan Ad-blocker dimatikan atau coba mode Incognito/Private browser." });
                setStep(2);
            } finally {
                setIsSending(false);
            }
        }
    };

    const getPrompt = () => {
        if (step === 0) return "Your name? ";
        if (step === 1) return "Your email: ";
        if (step === 2) return "Your message: ";
        if (step === 4) return "Done. ";
        return "➜ ";
    };

    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onViewportEnter={() => {

                    if (window.innerWidth >= 768 && inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
                viewport={{ once: false, amount: 0.5 }}
                onClick={handleContainerClick}
                className="relative bg-[#0d0d0d] rounded-lg border border-purple-500/20 shadow-2xl overflow-hidden font-mono text-[12px] sm:text-sm leading-relaxed cursor-text"
            >
                {/* Terminal Header */}
                <div className="bg-[#1a1a1a] px-4 py-2 border-b border-purple-500/10 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400 opacity-60"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-60"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400 opacity-60"></div>
                    </div>
                    <div className="text-[10px] text-purple-400/50 uppercase tracking-widest flex items-center">
                        <Terminal className="w-3 h-3 mr-2" />
                        contact_terminal_v2
                    </div>
                </div>

                {/* Terminal Body */}
                <div
                    ref={scrollRef}
                    className="h-[300px] sm:h-[400px] p-4 sm:p-6 overflow-y-auto text-purple-100/90 scroll-smooth"
                >
                    {history.map((line, i) => (
                        <div key={i} className="mb-2">
                            {line.type === "user" ? (
                                <div className="flex space-x-2">
                                    <span className="text-purple-400">➜</span>
                                    <span className="break-all">{line.content}</span>
                                </div>
                            ) : line.type === "error" ? (
                                <div className="flex space-x-2 text-red-400">
                                    <span>[ERROR]</span>
                                    <span>{line.content}</span>
                                </div>
                            ) : line.type === "success" ? (
                                <div className="flex space-x-2 text-green-400 font-semibold">
                                    <span>[SUCCESS]</span>
                                    <span>{line.content}</span>
                                </div>
                            ) : (
                                <div className="text-purple-300/70 italic">
                                    <span># {line.content}</span>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Active Line */}
                    {step <= 4 && (
                        <form onSubmit={handleCommand} className="flex items-center space-x-2 mt-4">
                            <span className="text-purple-400 whitespace-nowrap">{getPrompt()}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none flex-1 text-purple-100 caret-purple-500"
                                disabled={isSending || step === 4}
                            />
                            {isSending && <Loader2 className="w-4 h-4 animate-spin text-purple-400" />}
                        </form>
                    )}

                    {/* Blink Cursor when inactive/waiting */}
                    {!input && !isSending && step < 4 && (
                        <div className="w-2 h-4 bg-purple-500/50 animate-pulse mt-1 inline-block" />
                    )}
                </div>

                {/* Scanlines Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10"></div>
            </motion.div>

            <p className="mt-4 text-center text-[10px] text-gray-500 font-mono tracking-widest uppercase opacity-50">
                Type 'clear' to restart or 'help' for commands
            </p>
        </div>
    );
};

export default GetInTouch;