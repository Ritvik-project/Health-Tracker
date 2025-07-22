import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<'success' | 'not_registered' | 'invalid_password'>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isEmailRegistered: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const USERS_KEY = 'registeredUsers';
const CURRENT_USER_KEY = 'user';

const getAllUsers = (): (User & { password: string })[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveAllUsers = (users: (User & { password: string })[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<'success' | 'not_registered' | 'invalid_password'> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getAllUsers();
    const existingUser = users.find(u => u.email === email);

    if (!existingUser) {
      setIsLoading(false);
      return 'not_registered';
    }

    if (existingUser.password !== password) {
      setIsLoading(false);
      return 'invalid_password';
    }

    const { password: _, ...userWithoutPassword } = existingUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    setIsLoading(false);
    return 'success';
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getAllUsers();
    const alreadyExists = users.some(u => u.email === userData.email);

    if (alreadyExists) {
      setIsLoading(false);
      return false;
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      ...userData
    };

    users.push(newUser);
    saveAllUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    setIsLoading(false);
    return true;
  };

  const isEmailRegistered = (email: string): boolean => {
    const users = getAllUsers();
    return users.some(u => u.email === email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isEmailRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};
