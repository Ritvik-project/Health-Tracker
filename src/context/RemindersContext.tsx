// src/context/RemindersContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

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
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

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
