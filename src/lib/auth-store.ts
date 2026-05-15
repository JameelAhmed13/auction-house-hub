// Minimal frontend-only auth + theme + role state (localStorage backed).
import { useEffect, useState } from "react";

type Role = "buyer" | "seller";
type SellerType = "individual" | "organization";

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: Role[];
  currentMode: Role;
  sellerType: SellerType;
}

const KEY = "bkcars-auth";
const THEME_KEY = "bkcars-theme";

const DEFAULT_USER: AppUser = {
  id: "user-1",
  firstName: "Khalid",
  lastName: "Al Mansoori",
  email: "khalid@bkcars.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  roles: ["buyer", "seller"],
  currentMode: "buyer",
  sellerType: "organization",
};

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): AppUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as AppUser; } catch { return null; }
}
function write(u: AppUser | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else localStorage.removeItem(KEY);
  listeners.forEach((l) => l());
}

export function login() { write(DEFAULT_USER); }
export function logout() { write(null); }
export function setMode(mode: Role) {
  const u = read() ?? DEFAULT_USER;
  write({ ...u, currentMode: mode });
}
export function updateUser(patch: Partial<AppUser>) {
  const u = read() ?? DEFAULT_USER;
  write({ ...u, ...patch });
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(() => read());
  useEffect(() => {
    const l = () => setUser(read());
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { user, isAuthed: !!user, login, logout, setMode };
}

// ----- theme -----
export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem(THEME_KEY) as "light" | "dark") ?? "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return { theme, setTheme: setThemeState, toggle: () => setThemeState(theme === "dark" ? "light" : "dark") };
}
