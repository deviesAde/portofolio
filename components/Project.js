"use client"

import { useState, useEffect, useRef } from "react"
import ProjectFolder from "@/components/ui/ProjectFolder"
import ProjectModal from "@/components/ui/ProjectModal"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Magnetic from "./ui/Magnetic"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    id: 1,
    name: "ESD Math",
    role: "Backend Developer",
    date: "Aug 2025",
    location: "Jember, Indonesia",
    description: "Interactive digital platform for contextual mathematics learning",
    images: ["/images/projects/esd1.png", "/images/projects/esd2.png"],
    demoUrl: "https://esdmathpath.com/",
    tech: ["Laravel ", "API Development"],
  },
  {
    id: 2,
    name: "IBP Academy",
    role: "Fullstack Developer",
    date: "Aug 2025",
    location: "Jember, Indonesia",
    description: "Learning Management System for International Business Project competition",
    images: ["/images/projects/ibp.png", "/images/projects/ibp2.png"],
    demoUrl: "https://academy.ibpub.org/",
    tech: ["React", "Laravel", "Database Design"],
  },
  {
    id: 3,
    name: "BBRI Stock Prediction",
    role: "Machine Learning",
    date: "Aug 2025",
    location: "Jember, Indonesia",
    description: "LSTM-based model for predicting Bank Rakyat Indonesia stock prices",
    images: ["/images/projects/BBRI.jpeg"],
    demoUrl: "https://github.com/deviesAde/LSTM-BBRI.git",
    tech: ["Python", "LSTM", "Data Analysis"],
  },
  {
    id: 4,
    name: "Sapardi",
    role: "Fullstack Developer",
    date: "Apr 2025",
    location: "Jember, Indonesia",
    description: "AI-powered chatbot assisting farmers with rice cultivation guidance",
    images: ["/images/2025/devies_sapardi2.jpg", "/images/2025/devies_sapardi3.jpg"],
    demoUrl: "https://github.com/deviesAde/sapardi-app.git",
    tech: ["React", "Laravel", "YOLO", "AI Chatbot"],
  },
  {
    id: 5,
    name: "ResQFood",
    role: "Frontend Developer",
    date: "Dec 2024",
    location: "Jember, Indonesia",
    description: "Frontend web application to reduce food waste by selling near-expiry food at discounted prices, with a focus on responsive UI, interactive components, and seamless user experience. akses /seller for seller and /admin for admin",
    images: ["/images/projects/resq1.png", "/images/projects/resq2.png"],
    demoUrl: "resqfood-app.vercel.app",
    tech: ["Next.js"]
  },
]

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const ctx = gsap.context(() => {

      gsap.fromTo(".project-header-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".project-header-reveal",
            start: "top 95%", // More aggressive start
            toggleActions: "play none none none"
          }
        }
      );

      // Cards staggered reveal
      gsap.fromTo(".project-card-trigger",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // Parallax lines
      gsap.to(".parallax-line", {
        height: "100%",
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full py-32 relative overflow-hidden bg-background border-t border-foreground/5"
    >
      {/* Editorial Accents */}
      <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl project-header-reveal">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-2 w-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Portfolio.Works</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              MY RECENTLY <br />
              <span className="text-accent italic font-light drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">PROJECTS</span>
            </h2>
          </div>
          <div className="md:w-1/3 pb-2">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base border-l border-accent/20 pl-6 italic">
              &quot;Talk is cheap. Show me the code.&quot; – Linus Torvalds
            </p>
          </div>
        </div>

        {/* Projects Grid - More Dynamic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card-trigger transition-all duration-700`}
              // Only apply asymmetry on medium screens and up
              style={{ paddingTop: (index % 2 === 1) ? 'clamp(0px, 4vw, 40px)' : '0px' }}
            >
              <Magnetic>
                <div className="md:contents block">
                  <ProjectFolder
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                </div>
              </Magnetic>
            </div>
          ))}
        </div>
      </div>


      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default ProjectsSection
