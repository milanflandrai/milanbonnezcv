import { Window } from '../UI/Window';
import { Briefcase, Calendar, MapPin, TrendingUp, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { career, type CareerEntry } from '../../data/cvData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CareerApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentEntry = career[currentIndex];
  const years = career.map((c) => c.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const goToNext = () => {
    if (currentIndex < career.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToYear = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <Window id="career" title="Career.app" icon={<Briefcase className="w-4 h-4" />}>
      <div className="space-y-6">
        {/* Time Travel Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-white/40">
            <span>{minYear}</span>
            <span className="text-white/60 font-medium">Time Travel</span>
            <span>{maxYear}</span>
          </div>

          {/* Timeline */}
          <div className="relative h-12 flex items-center">
            {/* Track */}
            <div className="absolute inset-x-0 h-1 bg-white/10 rounded-full" />

            {/* Progress */}
            <motion.div
              className="absolute h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={false}
              animate={{
                width: `${((currentIndex) / (career.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Points */}
            {career.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => goToYear(index)}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${(index / (career.length - 1)) * 100}%` }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    index <= currentIndex
                      ? 'bg-blue-500 border-blue-400'
                      : 'bg-white/10 border-white/20'
                  }`}
                />
                <span
                  className={`absolute top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap ${
                    index === currentIndex ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {entry.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-sm text-white/40">
              {currentIndex + 1} of {career.length}
            </span>
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === career.length - 1}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Career Card */}
        <div className="relative overflow-hidden min-h-[350px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentEntry.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <CareerCard entry={currentEntry} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}

function CareerCard({ entry }: { entry: CareerEntry }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">{entry.role}</h2>
            {entry.type === 'internship' && (
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                Internship
              </span>
            )}
            {entry.type === 'student' && (
              <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 rounded-full">
                Student Job
              </span>
            )}
          </div>
          <p className="text-lg text-white/60">{entry.company}</p>
          <div className="flex items-center gap-4 mt-1 text-sm text-white/40">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {entry.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {entry.location}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-white/70">{entry.summary}</p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {entry.metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5"
          >
            <p className="text-lg font-semibold text-white">{metric.value}</p>
            <p className="text-xs text-white/40">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Impact */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
          <TrendingUp className="w-4 h-4" />
          Key Impact
        </h3>
        <ul className="space-y-2">
          {entry.impact.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* What I Learned */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <h3 className="flex items-center gap-2 text-sm font-medium text-amber-400 mb-1">
          <Lightbulb className="w-4 h-4" />
          What I Learned
        </h3>
        <p className="text-sm text-white/70">{entry.learned}</p>
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-2">
        {entry.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs bg-white/5 text-white/60 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
