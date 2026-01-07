import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { login, refresh, signup } from "@api/auth";
import api from "@api/client";

export type Role = "ADMIN" | "USER" | "OWNER";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  address?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: { name: string; email: string; password: string; address: string }) => Promise<void>;
  signOut: () => void;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "authUser";

const parseStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUserState] = useState<AuthUser | null>(() => parseStoredUser());
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem(ACCESS_TOKEN_KEY));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem(REFRESH_TOKEN_KEY));

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const persistTokens = useCallback((tokens: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await api.get<{ success: boolean; data: AuthUser }>("/auth/me");
      setUserState(data.data);
      return data.data;
    } catch (error) {
      console.error("Failed to load current user", error);
      setUserState(null);
      throw error;
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const tokens = await login({ email, password });
    persistTokens(tokens);
    await fetchCurrentUser();
  }, [fetchCurrentUser, persistTokens]);

  const signUp = useCallback(async (payload: { name: string; email: string; password: string; address: string }) => {
    const tokens = await signup(payload);
    persistTokens(tokens);
    await fetchCurrentUser();
  }, [fetchCurrentUser, persistTokens]);

  const signOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAccessToken(null);
    setRefreshToken(null);
    setUserState(null);
    queryClient.clear();
  }, [queryClient]);

  const setUser = useCallback((value: AuthUser | null) => {
    setUserState(value);
  }, []);

  const refreshTokens = useCallback(async () => {
    if (!refreshToken) {
      signOut();
      return;
    }
    try {
      const tokens = await refresh(refreshToken);
      persistTokens(tokens);
    } catch (error) {
      console.error("Failed to refresh token", error);
      signOut();
    }
  }, [persistTokens, refreshToken, signOut]);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }
    const interval = window.setInterval(() => {
      refreshTokens().catch(() => signOut());
    }, 1000 * 60 * 20);

    return () => window.clearInterval(interval);
  }, [refreshToken, refreshTokens, signOut]);

  const value = useMemo(() => ({
    user,
    setUser,
    accessToken,
    isAuthenticated: Boolean(accessToken && user),
    signIn,
    signUp,
    signOut
  }), [accessToken, signIn, signOut, signUp, user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
