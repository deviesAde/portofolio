"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Code2, BrainCircuit, Database, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Fullstack Web Development",
        description: "Building modern, responsive, and performance-optimized web applications using React, Next.js, and Tailwind CSS.",
        icon: <Code2 className="w-10 h-10 text-accent" />,
        tags: ["React", "Next.js", "Tailwind", "GSAP"],
    },
    {
        title: "AI & Machine Learning",
        description: "Integrating intelligent solutions using computer vision, NLP, and model optimization (YOLO, LSTM).",
        icon: <BrainCircuit className="w-10 h-10 text-accent" />,
        tags: ["Python", "YOLO", "LSTM", "AI Integration"],
    },
    {
        title: "Backend Engineering",
        description: "Architecting robust backend systems and RESTful APIs with focus on security, scalability, and database efficiency.",
        icon: <Database className="w-10 h-10 text-accent" />,
        tags: ["Laravel", "PHP", "MySQL", "API"],
    },
];

const Services = () => {
    return (
        <section id="services" className="w-full py-24 relative overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <Sparkles className="text-accent" size={20} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">My Expertise</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                        WHAT I <br />
                        <span className="text-accent italic font-light drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">OFFER</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <CardContainer key={idx} className="inter-var">
                            <CardBody className="bg-black/40 relative group/card dark:hover:shadow-2xl dark:hover:shadow-accent/[0.1] border-white/[0.1] w-auto h-auto rounded-xl p-8 border">
                                <CardItem translateZ="50" className="mb-6">
                                    {service.icon}
                                </CardItem>

                                <CardItem
                                    translateZ="60"
                                    className="text-2xl font-bold text-white mb-4"
                                >
                                    {service.title}
                                </CardItem>

                                <CardItem
                                    as="p"
                                    translateZ="40"
                                    className="text-muted-foreground text-sm leading-relaxed mb-8"
                                >
                                    {service.description}
                                </CardItem>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {service.tags.map((tag, i) => (
                                        <CardItem
                                            key={i}
                                            translateZ="80"
                                            className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider"
                                        >
                                            {tag}
                                        </CardItem>
                                    ))}
                                </div>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
