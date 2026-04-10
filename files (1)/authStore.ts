import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "Admin" | "Customer";
  memberSince: string;
  totalSpent: number;
  ordersCount: number;
  isVip: boolean;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      login: (user, token) =>
        set({ user, token, isAuthenticated: true, isAdmin: user.role === "Admin" }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, isAdmin: false }),
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    { name: "lady-fashion-auth" }
  )
);

// ── Wishlist Store ──────────────────────────────────────────
interface WishlistStore {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set({ ids: get().ids.includes(id) ? get().ids.filter((i) => i !== id) : [...get().ids, id] }),
      has: (id) => get().ids.includes(id),
    }),
    { name: "lady-fashion-wishlist" }
  )
);
