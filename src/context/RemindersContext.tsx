import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext"; // ✅ Import auth to get current user

export interface Reminder {
  id: string;
  doctorName: string;
  date: string;
  instructions: string;
  medications: {
    name: string;
    dosage: string;
    duration: string;
    frequency: string;
  }[];
}

interface RemindersContextType {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
}

const RemindersContext = createContext<RemindersContextType | undefined>(undefined);

export const RemindersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Load reminders from localStorage when user id is available
  useEffect(() => {
    if (!userId) return;
    const stored = localStorage.getItem(`reminders_${userId}`);
    setReminders(stored ? JSON.parse(stored) : []);
  }, [userId]);

  // Save reminders to localStorage when they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`reminders_${userId}`, JSON.stringify(reminders));
    }
  }, [reminders, userId]);

  const addReminder = (reminder: Reminder) => {
    setReminders((prev) => [reminder, ...prev]);
  };

  return (
    <RemindersContext.Provider value={{ reminders, addReminder }}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => {
  const context = useContext(RemindersContext);
  if (!context) {
    throw new Error("useReminders must be used within a RemindersProvider");
  }
  return context;
};
