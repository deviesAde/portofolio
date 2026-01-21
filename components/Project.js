"use client"

import { useState } from "react"
import ProjectFolder from "@/components/ui/ProjectFolder"
import ProjectModal from "@/components/ui/ProjectModal"

const projects = [
  {
    id: 1,
    name: "ESD Math",
    role: "Backend Developer",
    date: "Aug 2025",
    location: "Jember, Indonesia",
    description: "Interactive digital platform for contextual mathematics learning",
    images: ["/images/2025/devies_sapardi2.jpg", "/2025/devies_sapardi3.jpg"],
    demoUrl: "#",
    tech: ["Node.js", "API Development", "Authentication"],
  },
  {
    id: 2,
    name: "IBP Academy",
    role: "Fullstack Developer",
    date: "Aug 2025",
    location: "Jember, Indonesia",
    description: "Learning Management System for International Business Project competition",
    images: ["/project-placeholder-3.jpg", "/project-placeholder-4.jpg"],
    demoUrl: "#",
    tech: ["React", "Node.js", "Database Design"],
  },
  {
    id: 3,
    name: "BBRI Stock Prediction",
    role: "Machine Learning",
    date: "Aug 2025",
    location: "Jember, Indonesia",
    description: "LSTM-based model for predicting Bank Rakyat Indonesia stock prices",
    images: ["/project-placeholder-5.jpg", "/project-placeholder-6.jpg"],
    demoUrl: "#",
    tech: ["Python", "LSTM", "Data Analysis"],
  },
  {
    id: 4,
    name: "Sapardi",
    role: "Fullstack Developer",
    date: "Apr 2025",
    location: "Jember, Indonesia",
    description: "AI-powered chatbot assisting farmers with rice cultivation guidance",
    images: ["/project-placeholder-7.jpg", "/project-placeholder-8.jpg"],
    demoUrl: "#",
    tech: ["React", "Laravel", "YOLO", "AI Chatbot"],
  },
  {
    id: 5,
    name: "Sapardi",
    role: "Fullstack Developer",
    date: "Apr 2025",
    location: "Jember, Indonesia",
    description: "AI-powered chatbot assisting farmers with rice cultivation guidance",
    images: ["/project-placeholder-7.jpg", "/project-placeholder-8.jpg"],
    demoUrl: "#",
    tech: ["React", "Laravel", "YOLO", "AI Chatbot"],
  },
]

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section
      id="projects"
      className="w-full py-20 relative overflow-hidden bg-white dark:bg-black"
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Featured work and case studies showcasing my development skills
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectFolder
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
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
