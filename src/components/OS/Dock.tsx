import { motion } from 'framer-motion';
import { useWindowStore, type AppId } from '../../stores/windowStore';
import { User, Briefcase, Sparkles, FolderOpen, Terminal, Mail } from 'lucide-react';

interface DockItem {
  id: AppId;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const dockItems: DockItem[] = [
  { id: 'about', label: 'About', icon: <User className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
  { id: 'career', label: 'Career', icon: <Briefcase className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' },
  { id: 'skills', label: 'Skills', icon: <Sparkles className="w-6 h-6" />, color: 'from-amber-500 to-orange-600' },
  { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-6 h-6" />, color: 'from-cyan-500 to-teal-600' },
  { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-6 h-6" />, color: 'from-gray-600 to-gray-800' },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-6 h-6" />, color: 'from-green-500 to-emerald-600' },
];

export function Dock() {
  const { windows, openWindow, focusWindow } = useWindowStore();

  const handleClick = (id: AppId) => {
    if (windows[id].isOpen && !windows[id].isMinimized) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', damping: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-end gap-2 px-3 py-2 glass rounded-2xl">
        {dockItems.map((item, index) => {
          const isOpen = windows[item.id].isOpen;

          return (
            <motion.button
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item.id)}
              className="relative group"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg transition-shadow group-hover:shadow-xl`}
              >
                {item.icon}
              </div>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </div>

              {/* Open indicator */}
              {isOpen && (
                <motion.div
                  layoutId={`indicator-${item.id}`}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
