// SAPTHA — Learn · Inspire · Together · Achieve
// Authentication & Role Management Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';
import { SapthaStore } from '../lib/store';

interface AuthContextType {
  user: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const activeUser = SapthaStore.getCurrentUser();
      setUser(activeUser);
    } catch (err) {
      console.error('Error reading auth state', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const loggedProfile = await SapthaStore.signInAdmin(email, pass);
      setUser(loggedProfile);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    SapthaStore.signOut();
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
