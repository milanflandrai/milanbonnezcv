import { Window } from '../UI/Window';
import { FolderOpen, ArrowRight, X } from 'lucide-react';
import { projects, type Project } from '../../data/cvData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Window id="projects" title="Projects" icon={<FolderOpen className="w-4 h-4" />}>
      <div className="space-y-4">
        {/* Project Grid */}
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 text-left transition-all hover:bg-white/[0.07]"
            >
              {/* Folder icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mb-3">
                <FolderOpen className="w-6 h-6 text-cyan-400" />
              </div>

              <h3 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/50 mt-1 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-white/30">{project.year}</span>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-[#1a1a1c] rounded-xl border border-white/10 overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">{selectedProject.title}</h2>
                      <p className="text-sm text-white/40">{selectedProject.year}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-white/70">{selectedProject.description}</p>

                  {/* Problem -> Approach -> Result */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <h3 className="text-sm font-medium text-red-400 mb-2">Problem</h3>
                      <p className="text-white/70">{selectedProject.problem}</p>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>

                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <h3 className="text-sm font-medium text-amber-400 mb-2">Approach</h3>
                      <p className="text-white/70">{selectedProject.approach}</p>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>

                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <h3 className="text-sm font-medium text-green-400 mb-2">Result</h3>
                      <p className="text-white/70">{selectedProject.result}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-medium text-white/40 mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-white/5 text-white/60 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
