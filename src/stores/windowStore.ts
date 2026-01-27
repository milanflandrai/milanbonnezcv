import { create } from 'zustand';

export type AppId = 'about' | 'career' | 'skills' | 'projects' | 'terminal' | 'contact';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowStore {
  windows: Record<AppId, WindowState>;
  activeWindow: AppId | null;
  maxZIndex: number;
  bootComplete: boolean;
  viewMode: 'recruiter' | 'founder' | 'techlead';

  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updatePosition: (id: AppId, position: { x: number; y: number }) => void;
  setBootComplete: (complete: boolean) => void;
  setViewMode: (mode: 'recruiter' | 'founder' | 'techlead') => void;
}

const defaultWindowConfig: Record<AppId, Partial<WindowState>> = {
  about: { size: { width: 600, height: 500 }, position: { x: 100, y: 80 } },
  career: { size: { width: 800, height: 600 }, position: { x: 150, y: 60 } },
  skills: { size: { width: 700, height: 550 }, position: { x: 200, y: 100 } },
  projects: { size: { width: 850, height: 600 }, position: { x: 120, y: 70 } },
  terminal: { size: { width: 700, height: 450 }, position: { x: 180, y: 120 } },
  contact: { size: { width: 500, height: 400 }, position: { x: 250, y: 150 } },
};

const createDefaultWindows = (): Record<AppId, WindowState> => {
  const apps: AppId[] = ['about', 'career', 'skills', 'projects', 'terminal', 'contact'];
  return apps.reduce((acc, id) => {
    acc[id] = {
      id,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: defaultWindowConfig[id].position || { x: 100, y: 100 },
      size: defaultWindowConfig[id].size || { width: 600, height: 400 },
    };
    return acc;
  }, {} as Record<AppId, WindowState>);
};

export const useWindowStore = create<WindowStore>((set) => ({
  windows: createDefaultWindows(),
  activeWindow: null,
  maxZIndex: 1,
  bootComplete: false,
  viewMode: 'recruiter',

  openWindow: (id) =>
    set((state) => {
      const newZIndex = state.maxZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: newZIndex,
          },
        },
        activeWindow: id,
        maxZIndex: newZIndex,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false },
      },
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMaximized: !state.windows[id].isMaximized,
        },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      if (!state.windows[id].isOpen) return state;
      const newZIndex = state.maxZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMinimized: false,
            zIndex: newZIndex,
          },
        },
        activeWindow: id,
        maxZIndex: newZIndex,
      };
    }),

  updatePosition: (id, position) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    })),

  setBootComplete: (complete) => set({ bootComplete: complete }),

  setViewMode: (mode) => set({ viewMode: mode }),
}));
