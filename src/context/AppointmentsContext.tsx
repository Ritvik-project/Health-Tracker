import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: "upcoming" | "completed" | "cancelled";
  userId?: string;
}

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return context;
};
