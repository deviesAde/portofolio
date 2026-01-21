'use client'

import { X, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-2xl shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-purple-200 dark:border-purple-800 p-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h2>
              <p className="text-purple-600 dark:text-purple-400 font-medium">
                {project.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.date} • {project.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-900 dark:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                About
              </h3>
              <p className="text-gray-900 dark:text-gray-100 leading-relaxed text-balance">
                {project.description}
              </p>
            </div>

            {/* Images Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
                Project Images
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-video border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors duration-200"
                  >
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`${project.name} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-${1600000000000 + index}?w=500&h=300&fit=crop`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-purple-300 dark:border-purple-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
