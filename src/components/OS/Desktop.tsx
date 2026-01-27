import { motion } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import { Menubar } from './Menubar';
import { Dock } from './Dock';
import { AboutApp } from '../Apps/AboutApp';
import { CareerApp } from '../Apps/CareerApp';
import { SkillsApp } from '../Apps/SkillsApp';
import { ProjectsApp } from '../Apps/ProjectsApp';
import { TerminalApp } from '../Apps/TerminalApp';
import { ContactApp } from '../Apps/ContactApp';
import { AnimatePresence } from 'framer-motion';

export function Desktop() {
  const { bootComplete } = useWindowStore();

  if (!bootComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-[#0f0f12] via-[#0a0a0d] to-[#0d0d10]"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Menubar />

      {/* Windows */}
      <AnimatePresence>
        <AboutApp />
        <CareerApp />
        <SkillsApp />
        <ProjectsApp />
        <TerminalApp />
        <ContactApp />
      </AnimatePresence>

      <Dock />

      {/* Keyboard shortcuts hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-20 right-4 text-xs text-white/20"
      >
        Try: Ctrl+K for search
      </motion.div>
    </motion.div>
  );
}
