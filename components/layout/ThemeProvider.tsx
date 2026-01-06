"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Simple external store to avoid setState inside effects
let currentTheme: Theme = "dark";
const themeSubscribers = new Set<() => void>();

const setThemeStore = (next: Theme) => {
  currentTheme = next;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }
  themeSubscribers.forEach((cb) => cb());
};

const subscribeTheme = (callback: () => void) => {
  themeSubscribers.add(callback);
  return () => themeSubscribers.delete(callback);
};

const getSnapshot = () => currentTheme;
const getServerSnapshot = (): Theme => "dark";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const saved = localStorage.getItem("theme");
  if (isTheme(saved)) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getSnapshot,
    getServerSnapshot
  );

  // Resolve client preference after mount without touching React state setters
  useEffect(() => {
    const initial = resolveInitialTheme();
    setThemeStore(initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeStore(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}