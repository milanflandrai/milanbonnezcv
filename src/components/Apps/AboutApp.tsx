import { Window } from '../UI/Window';
import { User, MapPin, Clock, Zap, Brain, Users, Target, GraduationCap } from 'lucide-react';
import { profile, education } from '../../data/cvData';
import { useWindowStore } from '../../stores/windowStore';
import { motion } from 'framer-motion';
import profilePhoto from '../../assets/mb_pp.jpeg';

export function AboutApp() {
  const { viewMode } = useWindowStore();

  return (
    <Window id="about" title="About.sys" icon={<User className="w-4 h-4" />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src={profilePhoto}
            alt={profile.name}
            className="w-20 h-20 rounded-2xl object-cover shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-semibold text-white">{profile.name}</h1>
            <p className="text-white/60">{profile.title}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {profile.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Summary - changes based on view mode */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-white/5 border border-white/5"
        >
          <p className="text-white/80 leading-relaxed">{profile.summary[viewMode]}</p>
          <p className="text-xs text-white/30 mt-2">
            Viewing as: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </p>
        </motion.div>

        {/* System Specs */}
        <div>
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-wide mb-3">
            System Specifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {profile.strengths.map((strength, i) => (
              <motion.div
                key={strength.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && <Zap className="w-4 h-4 text-yellow-400" />}
                  {i === 1 && <Brain className="w-4 h-4 text-purple-400" />}
                  {i === 2 && <Users className="w-4 h-4 text-blue-400" />}
                  {i === 3 && <Target className="w-4 h-4 text-green-400" />}
                  <span className="text-sm font-medium text-white">{strength.name}</span>
                </div>
                <p className="text-xs text-white/50">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Thinking Style */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <h3 className="text-sm font-medium text-white/60 mb-2">Thinking Style</h3>
          <p className="text-white/80">{profile.thinkingStyle}</p>
        </div>

        {/* Team Role */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <h3 className="text-sm font-medium text-white/60 mb-2">Role in Teams</h3>
          <p className="text-white/80">{profile.teamRole}</p>
        </div>

        {/* Differentiators */}
        <div>
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-wide mb-3">
            Key Differentiators
          </h2>
          <ul className="space-y-2">
            {profile.differentiators.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-white/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-wide mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Education
          </h2>

          {/* Higher Education */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-wide mb-2">
              Higher Education
            </h3>
            <div className="space-y-2">
              {education
                .filter((edu) => edu.level === 'higher')
                .map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {edu.degree}
                          {edu.specialization && (
                            <span className="text-blue-400"> ({edu.specialization})</span>
                          )}
                        </p>
                        <p className="text-xs text-white/50">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-white/40">{edu.period}</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Secondary Education */}
          <div>
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-wide mb-2">
              Secondary Education
            </h3>
            <div className="space-y-2">
              {education
                .filter((edu) => edu.level === 'secondary')
                .map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-2 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white/80">{edu.degree}</p>
                        <p className="text-xs text-white/40">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-white/40">{edu.period}</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
