// Minimal frontend-only auth + theme state (localStorage backed). CNIC-based for E-Auction.
import { useEffect, useState } from "react";

export type AppUserRole = "admin" | "buyer" | "user" | "viewer";

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  cnic: string; // Format: "42301-1234567-1"
  phone: string; // Format: "+92312345678"
  email: string;
  ntn?: string;
  companyName?: string;
  avatar?: string;
  role: AppUserRole;
}

const KEY = "eauction-auth";
const THEME_KEY = "eauction-theme";

const DEFAULT_USER: AppUser = {
  id: "user-1",
  firstName: "Muhammad",
  lastName: "Hassan",
  cnic: "42301-1234567-1",
  phone: "+923001234567",
  email: "hassan@example.pk",
  avatar: undefined,
  role: "buyer",
};

const ADMIN_USER: AppUser = {
  id: "admin-1",
  firstName: "Admin",
  lastName: "Super",
  cnic: "11111-1111111-1",
  phone: "+923001111111",
  email: "admin@eauction.gov.pk",
  avatar: undefined,
  role: "admin",
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

export function login(credentials?: Partial<AppUser>) {
  // Check if admin CNIC
  const cnic = credentials?.cnic ?? "";
  if (cnic === "11111-1111111-1" || cnic === "admin") {
    write({ ...ADMIN_USER, ...credentials, role: "admin" });
    return;
  }
  write(credentials ? { ...DEFAULT_USER, ...credentials } : DEFAULT_USER);
}
export function loginAsAdmin() { write(ADMIN_USER); }
export function logout() { write(null); }
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
  return {
    user,
    isAuthed: !!user,
    isAdmin: user?.role === "admin",
    isBuyer: user?.role === "buyer",
    login,
    logout,
    updateUser,
  };
}

// ----- theme -----
export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem(THEME_KEY) as "light" | "dark") ?? "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return { theme, setTheme: setThemeState, toggle: () => setThemeState(theme === "dark" ? "light" : "dark") };
}
