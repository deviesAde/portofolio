"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from 'emailjs-com';

const GetInTouch = () => {
    const [history, setHistory] = useState([
        { type: "system", content: "Sistem terminal siap. Memulai koneksi..." },
        { type: "system", content: 'Ketik pesan Anda atau ikuti instruksi di bawah.' },
    ]);

    const [input, setInput] = useState("");
    const [step, setStep] = useState(0); // 0: Start/Name, 1: Email, 2: Message, 3: Sending, 4: Success
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    // EmailJS Configuration - You can fill these in or use env vars
    const EMAILJS_CONFIG = {
        SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id",
        TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
        USER_ID: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key",
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

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
            setHistory([{ type: "system", content: "Terminal dibersihkan." }]);
            setStep(0);
            return;
        }

        if (val.toLowerCase() === "help") {
            addToHistory({ type: "system", content: "Perintah: clear (bersihkan), help (bantuan)." });
            return;
        }

        // Form Flow
        if (step === 0) {
            setFormData(prev => ({ ...prev, name: val }));
            addToHistory({ type: "system", content: `Halo ${val}! Silakan masukkan alamat email Anda:` });
            setStep(1);
        } else if (step === 1) {
            if (!val.includes("@") || !val.includes(".")) {
                addToHistory({ type: "error", content: "Format email tidak valid. Silakan coba lagi." });
            } else {
                setFormData(prev => ({ ...prev, email: val }));
                addToHistory({ type: "system", content: "Email diterima. Apa pesan yang ingin Anda sampaikan?" });
                setStep(2);
            }
        } else if (step === 2) {
            const currentMessage = val;
            setFormData(prev => ({ ...prev, message: currentMessage }));
            addToHistory({ type: "system", content: "Sedang mengirim pesan..." });
            setIsSending(true);
            setStep(3);

            try {
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: currentMessage,
                    to_email: "irawandevies@gmail.com"
                };

                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams,
                    EMAILJS_CONFIG.USER_ID
                );

                addToHistory({ type: "success", content: "Pesan berhasil dikirim ke irawandevies@gmail.com!" });
                addToHistory({ type: "system", content: "Terima kasih telah menghubungi saya. Ketik 'clear' untuk kirim pesan baru." });
                setStep(4);
            } catch (error) {
                console.error("EmailJS Error:", error);
                addToHistory({ type: "error", content: "Gagal mengirim pesan. Silakan coba lagi nanti." });
                setStep(2); // Go back to message step or let user try again
            } finally {
                setIsSending(false);
            }
        }
    };

    const getPrompt = () => {
        if (step === 0) return "Siapa nama Anda? ";
        if (step === 1) return "Email Anda: ";
        if (step === 2) return "Pesan Anda: ";
        if (step === 4) return "Selesai. ";
        return "➜ ";
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative bg-[#0d0d0d] rounded-lg border border-purple-500/20 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed"
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
                    className="h-[400px] p-6 overflow-y-auto text-purple-100/90 scroll-smooth"
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
                                autoFocus
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