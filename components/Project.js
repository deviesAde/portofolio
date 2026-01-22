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
    images: ["/images/projects/esd1.png", "/images/projects/esd2.png"],
    demoUrl: "https://esdmathpath.com/",
    tech: ["Laravel ", "API Development" ],
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
            My{" "} Recently 
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
