import { useEffect, useState, useCallback } from 'react';
import { useWindowStore } from '../stores/windowStore';

// Konami code sequence
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useEasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const { bootComplete } = useWindowStore();

  const showEasterEgg = useCallback(() => {
    setEasterEggTriggered(true);

    // Create confetti effect
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#22c55e', '#f59e0b'];
    const container = document.createElement('div');
    container.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.cssText = `
        position:absolute;
        width:10px;
        height:10px;
        background:${color};
        left:${Math.random() * 100}%;
        top:-20px;
        opacity:${0.5 + Math.random() * 0.5};
        border-radius:${Math.random() > 0.5 ? '50%' : '0'};
        transform:rotate(${Math.random() * 360}deg);
        animation:fall ${2 + Math.random() * 2}s linear forwards;
      `;
      container.appendChild(confetti);
    }

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Show message
    const message = document.createElement('div');
    message.style.cssText = `
      position:fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      background:rgba(0,0,0,0.9);
      color:white;
      padding:2rem 3rem;
      border-radius:1rem;
      font-size:1.5rem;
      z-index:10000;
      text-align:center;
      animation:popIn 0.3s ease-out;
    `;
    message.innerHTML = `
      <div style="font-size:3rem;margin-bottom:1rem">🎮</div>
      <div style="font-weight:bold;margin-bottom:0.5rem">Konami Code Activated!</div>
      <div style="font-size:1rem;opacity:0.7">You found the easter egg. You're clearly detail-oriented.</div>
    `;
    document.body.appendChild(message);

    // Add pop-in animation
    const popStyle = document.createElement('style');
    popStyle.textContent = `
      @keyframes popIn {
        from { transform: translate(-50%,-50%) scale(0.8); opacity: 0; }
        to { transform: translate(-50%,-50%) scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(popStyle);

    // Cleanup
    setTimeout(() => {
      container.remove();
      message.remove();
      style.remove();
      popStyle.remove();
      setEasterEggTriggered(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (easterEggTriggered) return;

      // Check Konami code
      if (e.code === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          showEasterEgg();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootComplete, konamiIndex, easterEggTriggered, showEasterEgg]);

  // Logo click easter egg (5 clicks)
  useEffect(() => {
    if (!bootComplete) return;

    let clickCount = 0;
    let clickTimer: number;

    const handleLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-logo]')) {
        clickCount++;
        clearTimeout(clickTimer);

        if (clickCount >= 5) {
          // Show "source code" easter egg
          const sourceModal = document.createElement('div');
          sourceModal.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.9);
            z-index:10000;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:2rem;
            cursor:pointer;
          `;
          sourceModal.innerHTML = `
            <div style="
              background:#1a1a1c;
              border-radius:1rem;
              padding:2rem;
              max-width:600px;
              width:100%;
              font-family:monospace;
              font-size:0.875rem;
              color:#fff;
            ">
              <div style="color:#666;margin-bottom:1rem">// milan.ts - source code</div>
              <pre style="color:#9cdcfe">const milan = {
  <span style="color:#ce9178">passion</span>: <span style="color:#b5cea8">"automating workflows & building digital workplaces"</span>,
  <span style="color:#ce9178">superpower</span>: <span style="color:#b5cea8">"bridging business and technology"</span>,
  <span style="color:#ce9178">workStyle</span>: <span style="color:#b5cea8">"remote-first, async-friendly"</span>,
  <span style="color:#ce9178">currentMood</span>: <span style="color:#b5cea8">"ready for new challenges"</span>,

  <span style="color:#dcdcaa">hire</span>() {
    <span style="color:#c586c0">return</span> <span style="color:#ce9178">"Let's build something scalable"</span>;
  }
};</pre>
              <div style="color:#666;margin-top:1rem">// Click anywhere to close</div>
            </div>
          `;

          sourceModal.addEventListener('click', () => sourceModal.remove());
          document.body.appendChild(sourceModal);

          clickCount = 0;
        } else {
          clickTimer = window.setTimeout(() => {
            clickCount = 0;
          }, 1000);
        }
      }
    };

    document.addEventListener('click', handleLogoClick);
    return () => document.removeEventListener('click', handleLogoClick);
  }, [bootComplete]);

  return null;
}
