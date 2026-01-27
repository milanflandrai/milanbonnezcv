import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindowStore, type AppId } from '../../stores/windowStore';
import { useRef, useState, useEffect } from 'react';

interface WindowProps {
  id: AppId;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Window({ id, title, icon, children }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } =
    useWindowStore();
  const windowState = windows[id];
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Optionally recalculate position on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const isMaximized = windowState.isMaximized;

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isMaximized ? 0 : windowState.position.x,
          width: isMaximized ? '100%' : windowState.size.width,
          height: isMaximized ? 'calc(100% - 80px)' : windowState.size.height,
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        drag={!isMaximized}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          updatePosition(id, {
            x: windowState.position.x + info.offset.x,
            y: windowState.position.y + info.offset.y,
          });
        }}
        onPointerDown={() => focusWindow(id)}
        style={{
          zIndex: windowState.zIndex,
          top: isMaximized ? 28 : windowState.position.y,
          left: isMaximized ? 0 : undefined,
        }}
        className={`fixed glass window-shadow rounded-xl overflow-hidden flex flex-col ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-4 h-12 bg-[#1a1a1c] border-b border-white/5 cursor-grab active:cursor-grabbing"
          onDoubleClick={() => maximizeWindow(id)}
        >
          <div className="flex items-center gap-2">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 flex items-center justify-center group"
              >
                <X className="w-2 h-2 text-[#7a0000] opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 flex items-center justify-center group"
              >
                <Minus className="w-2 h-2 text-[#7a5700] opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  maximizeWindow(id);
                }}
                className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 flex items-center justify-center group"
              >
                <Square className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/60">
            {icon}
            <span>{title}</span>
          </div>

          <div className="w-14" /> {/* Spacer for symmetry */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </motion.div>
    </>
  );
}
