'use client'

import { FolderOpen } from 'lucide-react'

export default function ProjectFolder({ project, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative w-full aspect-[4/5] bg-card border border-foreground/10 p-8 hover:border-accent/40 transition-all duration-500 flex flex-col justify-between items-start text-left overflow-hidden rounded-none"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[80px] group-hover:bg-accent/20 transition-colors duration-500" />

      {/* Corner Detail */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-foreground/20 group-hover:border-accent transition-colors duration-500" />

      {/* Top Section */}
      <div className="relative z-10 w-full flex justify-between items-start">
        <div className="p-3 bg-muted/50 border border-foreground/5 group-hover:border-accent/20 transition-colors duration-500 rounded-none">
          <FolderOpen
            size={24}
            className="text-muted-foreground group-hover:text-accent transition-colors duration-500"
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/40 group-hover:text-accent/40 uppercase tracking-widest">
          Ref. {project.id.toString().padStart(3, '0')}
        </span>
      </div>

      {/* Middle/Bottom Content */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            {project.role}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors duration-500">
            {project.name}
          </h3>
        </div>

        <div className="flex items-center gap-4 border-t border-foreground/5 pt-4">
          <p className="text-xs font-mono text-muted-foreground">
            {project.date}
          </p>
          <div className="h-1 w-1 bg-accent/30 rounded-full shadow-[0_0_5px_#a855f7]" />
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            {project.tech?.[0] || 'Web Dev'}
          </p>
        </div>
      </div>

      {/* Technical Stripe on hover */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/0 group-hover:bg-accent/60 transition-all duration-700 shadow-[0_0_15px_#a855f7]" />
    </button>
  )
}
