// src/context/AppointmentsContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: "upcoming" | "completed" | "cancelled";
  userId: string;
}

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
}

// Create context
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

// Provider
export const AppointmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [appointment, ...prev]);
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Hook
export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) throw new Error("useAppointments must be used within AppointmentsProvider");
  return context;
};
