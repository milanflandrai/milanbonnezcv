import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useWindowStore } from '../../stores/windowStore';

const bootLines = [
  { text: 'milan.os v1.0.25', delay: 0 },
  { text: 'Initializing professional profile...', delay: 200 },
  { text: 'Loading M365 & web development experience...', delay: 400 },
  { text: 'Mounting automation workflows...', delay: 600 },
  { text: 'Starting skills engine...', delay: 800 },
  { text: '', delay: 1000 },
  { text: 'SKILLS LOADED:', delay: 1100 },
  { text: '  Power Platform [########  ] 85%', delay: 1200 },
  { text: '  React/TS       [########  ] 80%', delay: 1300 },
  { text: '  SharePoint     [########  ] 80%', delay: 1400 },
  { text: '  SQL            [########  ] 80%', delay: 1500 },
  { text: '', delay: 1600 },
  { text: 'PROFILE LOADED:', delay: 1700 },
  { text: '  [x] M365 Business Consultant @ Dynamate', delay: 1800 },
  { text: '  [x] Business & IT background', delay: 1900 },
  { text: '  [x] Remote-first mindset', delay: 2000 },
  { text: '', delay: 2100 },
  { text: 'System ready.', delay: 2300 },
  { text: '', delay: 2400 },
  { text: 'Welcome. Click anywhere or press any key to begin.', delay: 2600 },
];

export function BootSequence() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const { bootComplete, setBootComplete } = useWindowStore();

  useEffect(() => {
    if (bootComplete) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [bootComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bootComplete) return;

    const handleInteraction = () => {
      if (visibleLines >= bootLines.length - 2) {
        setBootComplete(true);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [visibleLines, bootComplete, setBootComplete]);

  if (bootComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-[#0a0a0b] flex items-center justify-center p-8"
      >
        <div className="max-w-2xl w-full font-mono text-sm">
          {/* Terminal window frame */}
          <div className="bg-[#1a1a1c] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141415] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 text-white/40 text-xs">milan.os - boot</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 min-h-[400px]">
              {bootLines.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`${
                    line.text.startsWith('  [x]')
                      ? 'text-green-400'
                      : line.text.startsWith('  ')
                      ? 'text-blue-400'
                      : line.text.includes('LOADED') || line.text.includes('UNLOCKED')
                      ? 'text-yellow-400'
                      : line.text.includes('ready') || line.text.includes('Welcome')
                      ? 'text-green-400'
                      : 'text-white/70'
                  }`}
                >
                  {line.text === '' ? (
                    <br />
                  ) : (
                    <>
                      {!line.text.startsWith(' ') && (
                        <span className="text-white/40">{'> '}</span>
                      )}
                      {line.text}
                    </>
                  )}
                </motion.div>
              ))}

              {/* Cursor */}
              {visibleLines < bootLines.length && (
                <span
                  className={`inline-block w-2 h-4 bg-white/70 ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          </div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-4 text-white/30 text-xs"
          >
            {visibleLines >= bootLines.length - 2
              ? 'Click or press any key to continue'
              : 'Loading...'}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
