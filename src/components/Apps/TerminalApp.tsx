import { Window } from '../UI/Window';
import { Terminal } from 'lucide-react';
import { terminalResponses, profile, career, skills } from '../../data/cvData';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HistoryEntry {
  type: 'input' | 'output';
  content: string;
}

export function TerminalApp() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', content: 'Welcome to milan.os terminal' },
    { type: 'output', content: "Type 'help' for available commands or ask me anything!" },
    { type: 'output', content: '' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string): string => {
    const command = cmd.toLowerCase().trim();

    // Check predefined responses
    if (terminalResponses[command]) {
      return terminalResponses[command];
    }

    // Handle questions with "ask" prefix or natural language
    if (command.startsWith('ask ') || command.includes('?')) {
      return handleQuestion(command.replace('ask ', ''));
    }

    // Handle specific commands
    if (command === 'clear') {
      setHistory([]);
      return '';
    }

    if (command === 'skills' || command === 'skill') {
      const topSkills = skills
        .sort((a, b) => b.level - a.level)
        .slice(0, 5)
        .map((s) => `  ${s.name.padEnd(15)} [${'#'.repeat(Math.floor(s.level / 10))}${' '.repeat(10 - Math.floor(s.level / 10))}] ${s.level}%`)
        .join('\n');
      return `> Top Skills\n\n${topSkills}`;
    }

    if (command === 'career' || command === 'experience') {
      const careerList = career
        .map((c) => `  ${c.year} | ${c.role} @ ${c.company}`)
        .join('\n');
      return `> Career History\n\n${careerList}`;
    }

    if (command === 'projects') {
      return `> Notable Projects

  1. Real-time Collaboration Engine (2024)
  2. Predictive Analytics Platform (2020)
  3. A/B Testing Framework (2018)
  4. Enterprise Design System (2022)

  Type 'project <name>' for details.`;
    }

    if (command === 'contact') {
      return `> Contact

  Email: ${profile.email}
  Location: ${profile.location}
  Status: ${profile.availability}

  I'd love to hear from you!`;
    }

    return terminalResponses.unknown;
  };

  const handleQuestion = (question: string): string => {
    const q = question.toLowerCase();

    // Salary related
    if (q.includes('salary') || q.includes('compensation') || q.includes('rate')) {
      return `> Compensation

  I'm flexible and open to discussion. Compensation isn't just
  about the number—it's about the opportunity, the team, and
  the impact I can make.

  Let's have a conversation: ${profile.email}`;
    }

    // Availability
    if (q.includes('available') || q.includes('start') || q.includes('notice')) {
      return `> Availability

  Current status: ${profile.availability}
  Notice period: 4 weeks (negotiable for the right opportunity)
  Preferred start: Flexible`;
    }

    // Why hire
    if (q.includes('why') && (q.includes('hire') || q.includes('you'))) {
      return terminalResponses.hire;
    }

    // Biggest achievement
    if (q.includes('biggest') || q.includes('achievement') || q.includes('proud')) {
      return `> Biggest Achievement

  Building and selling two startups before 30.

  TaskFlow was acquired by Teamwork in 2017.
  DataPulse was acquired by Shopify in 2021.

  Combined exit value: €4M
  Total users impacted: 2M+`;
    }

    // Weaknesses
    if (q.includes('weakness') || q.includes('improve')) {
      return `> Areas for Growth

  I'm honest about my gaps:

  1. Delegation - I sometimes take on too much myself
  2. Patience with slow processes - I bias towards action
  3. Public speaking - Good, but working to be great

  I actively work on these through coaching and feedback.`;
    }

    // Tech stack
    if (q.includes('stack') || q.includes('tech')) {
      return `> Preferred Tech Stack

  Frontend: TypeScript, React, Next.js
  Backend: Node.js, Python, PostgreSQL
  Infra: AWS, Docker, Vercel
  Tools: Git, Figma, Linear

  But I'm pragmatic—I use what works best for the problem.`;
    }

    // Remote work
    if (q.includes('remote') || q.includes('office') || q.includes('hybrid')) {
      return `> Work Preferences

  I thrive in both remote and hybrid settings.
  Currently based in Amsterdam, open to relocation.

  What matters most: async-first culture, clear
  communication, and trust.`;
    }

    // Default AI response
    return `> Hmm, interesting question!

  "${question}"

  I don't have a pre-programmed answer for that, but I'd
  love to discuss it in person.

  Reach out: ${profile.email}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    setHistory((prev) => [...prev, { type: 'input', content: command }]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = processCommand(command);
      if (response) {
        setHistory((prev) => [...prev, { type: 'output', content: response }]);
      }
      setIsTyping(false);
    }, 300 + Math.random() * 400);
  };

  return (
    <Window id="terminal" title="Terminal" icon={<Terminal className="w-4 h-4" />}>
      <div
        ref={scrollRef}
        className="h-full font-mono text-sm overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {/* History */}
        {history.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-1 whitespace-pre-wrap ${
              entry.type === 'input' ? 'text-cyan-400' : 'text-white/70'
            }`}
          >
            {entry.type === 'input' && (
              <span className="text-green-400">milan@cv ~ $ </span>
            )}
            {entry.content}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="text-white/40 flex items-center gap-1">
            <span className="animate-pulse">...</span>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-green-400">milan@cv ~ $ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-cyan-400 ml-1"
            autoFocus
            spellCheck={false}
          />
          <span className="w-2 h-4 bg-white/70 cursor-blink" />
        </form>

        {/* Quick commands */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-white/30 text-xs mb-2">Quick commands:</p>
          <div className="flex flex-wrap gap-2">
            {['help', 'skills', 'career', 'contact', 'sudo hire'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 text-white/50 rounded transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
