import { Window } from '../UI/Window';
import { Mail, Linkedin, Github, Twitter, Send, Coffee, Rocket, Users } from 'lucide-react';
import { profile } from '../../data/cvData';
import { useState } from 'react';
import { motion } from 'framer-motion';

const connectionTypes = [
  {
    id: 'coffee',
    label: 'Grab a coffee',
    icon: <Coffee className="w-5 h-5" />,
    description: 'Casual chat about tech, product, or life',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'role',
    label: 'Discuss a role',
    icon: <Rocket className="w-5 h-5" />,
    description: 'I\'m open to the right opportunity',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 'collaborate',
    label: 'Collaborate',
    icon: <Users className="w-5 h-5" />,
    description: 'Build something together',
    color: 'from-green-500 to-teal-600',
  },
];

export function ContactApp() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Window id="contact" title="Connect.app" icon={<Mail className="w-4 h-4" />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Let's Connect</h2>
          <p className="text-white/50">Choose how you'd like to reach out</p>
        </div>

        {/* Connection Types */}
        <div className="grid grid-cols-3 gap-3">
          {connectionTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedType === type.id
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-white mx-auto mb-3`}
              >
                {type.icon}
              </div>
              <h3 className="font-medium text-white text-sm">{type.label}</h3>
              <p className="text-xs text-white/40 mt-1">{type.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Email CTA */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Primary contact</p>
              <p className="text-lg text-white font-medium">{profile.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  selectedType
                    ? `Re: ${connectionTypes.find((t) => t.id === selectedType)?.label}`
                    : 'Hello from your CV'
                )}`}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <p className="text-sm text-white/40 mb-3">Or find me on</p>
          <div className="flex gap-3">
            {[
              { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
              { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#' },
              { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                {social.icon}
                <span className="text-sm">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {profile.availability}
        </div>

        {/* Fun footer */}
        <p className="text-center text-xs text-white/30 pt-4 border-t border-white/5">
          Average response time: 24 hours (but usually faster for interesting opportunities)
        </p>
      </div>
    </Window>
  );
}
