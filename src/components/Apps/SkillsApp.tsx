import { Window } from '../UI/Window';
import { Sparkles, Code, Server, Cloud, Layers, Briefcase } from 'lucide-react';
import { skills, type Skill } from '../../data/cvData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'frontend', label: 'Frontend', icon: <Code className="w-4 h-4" /> },
  { id: 'backend', label: 'Backend', icon: <Server className="w-4 h-4" /> },
  { id: 'infrastructure', label: 'Infra', icon: <Cloud className="w-4 h-4" /> },
  { id: 'platform', label: 'Platform', icon: <Layers className="w-4 h-4" /> },
  { id: 'business', label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
];

export function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <Window id="skills" title="Skills.dmg" icon={<Sparkles className="w-4 h-4" />}>
      <div className="space-y-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkill(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-white/60 border border-transparent hover:bg-white/10'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.button
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedSkill(skill)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  selectedSkill?.name === skill.name
                    ? 'bg-blue-500/20 border-blue-500/30'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                } border`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-xs text-white/40">{skill.experience}</span>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      skill.level >= 90
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                        : skill.level >= 80
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        : skill.level >= 70
                        ? 'bg-gradient-to-r from-purple-500 to-pink-400'
                        : 'bg-gradient-to-r from-amber-500 to-orange-400'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-white/30">Level</span>
                  <span className="text-xs text-white/50">{skill.level}%</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Skill Detail */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{selectedSkill.name}</h3>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-white/40 hover:text-white/60"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wide">Experience</span>
                  <p className="text-white/80">{selectedSkill.experience}</p>
                </div>

                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wide">Use Cases</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedSkill.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wide">Proficiency</span>
                  <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                          level <= Math.ceil(selectedSkill.level / 20)
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/10 text-white/30'
                        }`}
                      >
                        {level}
                      </div>
                    ))}
                    <span className="text-sm text-white/50 ml-2">
                      {selectedSkill.level >= 90
                        ? 'Expert'
                        : selectedSkill.level >= 80
                        ? 'Advanced'
                        : selectedSkill.level >= 70
                        ? 'Proficient'
                        : 'Competent'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{skills.length}</p>
            <p className="text-xs text-white/40">Total Skills</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {skills.filter((s) => s.level >= 90).length}
            </p>
            <p className="text-xs text-white/40">Expert Level</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%
            </p>
            <p className="text-xs text-white/40">Avg Proficiency</p>
          </div>
        </div>
      </div>
    </Window>
  );
}
