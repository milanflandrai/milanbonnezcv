import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, Sparkles, FolderOpen, Terminal, Mail } from 'lucide-react';
import { useWindowStore, type AppId } from '../../stores/windowStore';
import { profile, skills, career, projects } from '../../data/cvData';

interface SearchResult {
  id: string;
  type: 'app' | 'skill' | 'career' | 'project' | 'action';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

export function SpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow, bootComplete } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!bootComplete) return;

      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootComplete]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const getResults = (): SearchResult[] => {
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Apps
    const apps: { id: AppId; title: string; icon: React.ReactNode }[] = [
      { id: 'about', title: 'About', icon: <User className="w-4 h-4" /> },
      { id: 'career', title: 'Career', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'skills', title: 'Skills', icon: <Sparkles className="w-4 h-4" /> },
      { id: 'projects', title: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
      { id: 'terminal', title: 'Terminal', icon: <Terminal className="w-4 h-4" /> },
      { id: 'contact', title: 'Contact', icon: <Mail className="w-4 h-4" /> },
    ];

    apps.forEach((app) => {
      if (!q || app.title.toLowerCase().includes(q)) {
        results.push({
          id: `app-${app.id}`,
          type: 'app',
          title: app.title,
          subtitle: 'Application',
          icon: app.icon,
          action: () => {
            openWindow(app.id);
            setIsOpen(false);
            setQuery('');
          },
        });
      }
    });

    // Skills
    if (q) {
      skills
        .filter((s) => s.name.toLowerCase().includes(q))
        .slice(0, 3)
        .forEach((skill) => {
          results.push({
            id: `skill-${skill.name}`,
            type: 'skill',
            title: skill.name,
            subtitle: `${skill.level}% - ${skill.experience}`,
            icon: <Sparkles className="w-4 h-4 text-amber-400" />,
            action: () => {
              openWindow('skills');
              setIsOpen(false);
              setQuery('');
            },
          });
        });

      // Career
      career
        .filter(
          (c) =>
            c.company.toLowerCase().includes(q) ||
            c.role.toLowerCase().includes(q)
        )
        .slice(0, 2)
        .forEach((entry) => {
          results.push({
            id: `career-${entry.id}`,
            type: 'career',
            title: entry.company,
            subtitle: entry.role,
            icon: <Briefcase className="w-4 h-4 text-purple-400" />,
            action: () => {
              openWindow('career');
              setIsOpen(false);
              setQuery('');
            },
          });
        });

      // Projects
      projects
        .filter((p) => p.title.toLowerCase().includes(q))
        .slice(0, 2)
        .forEach((project) => {
          results.push({
            id: `project-${project.id}`,
            type: 'project',
            title: project.title,
            subtitle: project.description.slice(0, 50) + '...',
            icon: <FolderOpen className="w-4 h-4 text-cyan-400" />,
            action: () => {
              openWindow('projects');
              setIsOpen(false);
              setQuery('');
            },
          });
        });
    }

    return results.slice(0, 8);
  };

  const results = getResults();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      results[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            setQuery('');
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#1a1a1c] rounded-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search className="w-5 h-5 text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Search ${profile.name}'s CV...`}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/30"
              />
              <kbd className="px-2 py-0.5 text-xs bg-white/10 text-white/40 rounded">esc</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={result.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                        index === selectedIndex
                          ? 'bg-blue-500/20 text-white'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          index === selectedIndex
                            ? 'bg-blue-500/30'
                            : 'bg-white/10'
                        }`}
                      >
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        <p className="text-sm text-white/40 truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      <span className="text-xs text-white/20 uppercase">
                        {result.type}
                      </span>
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="py-8 text-center text-white/40">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="py-4 px-4 text-sm text-white/40">
                  <p className="mb-2">Quick actions:</p>
                  <div className="space-y-1">
                    <p>Type to search skills, experience, or projects</p>
                    <p>Press Enter to select, Escape to close</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
