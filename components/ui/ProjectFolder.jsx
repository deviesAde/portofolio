'use client'

import { FolderOpen } from 'lucide-react'

export default function ProjectFolder({ project, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative h-48 sm:h-56 bg-gradient-to-br from-purple-50 via-white to-transparent dark:from-purple-950 dark:to-gray-900 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/50 flex flex-col justify-center items-center gap-4 cursor-pointer"
    >
      {/* Folder Icon */}
      <div className="relative">
        <FolderOpen
          size={56}
          className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 blur-xl bg-purple-300/30 dark:bg-purple-500/30 group-hover:bg-purple-300/50 dark:group-hover:bg-purple-500/50 -z-10 transition-colors duration-300" />
      </div>

      {/* Text Content */}
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {project.role}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {project.date}
        </p>
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-200/0 via-purple-200/10 dark:via-purple-500/10 to-purple-200/0" />
    </button>
  )
}
