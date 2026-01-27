import { useWindowStore } from '../../stores/windowStore';
import { Wifi, Battery, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Menubar() {
  const { viewMode, setViewMode, openWindow } = useWindowStore();
  const [time, setTime] = useState(new Date());
  const [showModeMenu, setShowModeMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const modeLabels = {
    recruiter: 'Recruiter',
    founder: 'Founder',
    techlead: 'Tech Lead',
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 text-xs z-50">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => openWindow('about')}
          className="font-semibold text-white/90 hover:text-white flex items-center gap-1"
        >
          <span className="text-base">&#x2318;</span>
          <span>milan.os</span>
        </button>

        <div className="flex items-center gap-3 text-white/60">
          <button
            onClick={() => openWindow('about')}
            className="hover:text-white/90 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => openWindow('career')}
            className="hover:text-white/90 transition-colors"
          >
            Career
          </button>
          <button
            onClick={() => openWindow('skills')}
            className="hover:text-white/90 transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => openWindow('projects')}
            className="hover:text-white/90 transition-colors"
          >
            Projects
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-white/60">
        {/* View Mode Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowModeMenu(!showModeMenu)}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors text-white/80"
          >
            {modeLabels[viewMode]} Mode
          </button>

          {showModeMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowModeMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 bg-[#2a2a2c] rounded-lg shadow-xl border border-white/10 py-1 min-w-[140px] z-50">
                {Object.entries(modeLabels).map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode as 'recruiter' | 'founder' | 'techlead');
                      setShowModeMenu(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left hover:bg-white/5 flex items-center justify-between ${
                      viewMode === mode ? 'text-blue-400' : 'text-white/70'
                    }`}
                  >
                    {label}
                    {viewMode === mode && <span>&#10003;</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />

        <div className="flex items-center gap-2 text-white/80">
          <span>{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
}
