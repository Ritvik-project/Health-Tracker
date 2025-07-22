import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useAppointments } from "../context/AppointmentsContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { appointments } = useAppointments();

  // Filter appointments by user and upcoming only
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming" && apt.userId === user?.id
  );
  const nextAppointment = upcomingAppointments[0];

  const getAccentText = () => (isDarkMode ? "text-purple-300" : "text-gray-600");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 sticky top-10 space-y-6">
          {/* Profile Card */}
          <Card
            variant="glass"
            className={`border ${
              isDarkMode
                ? "border-purple-500/20 bg-slate-800/60 backdrop-blur-lg text-white"
                : "border-gray-200 bg-white shadow text-black"
            }`}
          >
            <div className="text-center">
              <div
                className={`w-20 h-20 ${
                  isDarkMode ? "bg-purple-700/30" : "bg-purple-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <User
                  className={`h-10 w-10 ${
                    isDarkMode ? "text-purple-300" : "text-purple-600"
                  }`}
                />
              </div>
              <h2
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {user?.firstName} {user?.lastName}
              </h2>
              <div className={`space-y-2 text-sm ${getAccentText()}`}>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Born: {user?.dateOfBirth}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card
            variant="glass"
            className={`border ${
              isDarkMode
                ? "border-purple-500/20 bg-slate-800/60 backdrop-blur-lg text-white"
                : "border-gray-200 bg-white shadow text-black"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/appointments">
                <Button className="w-full" variant="outline">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/prescriptions">
                <Button className="w-full" variant="outline">
                  View Prescriptions
                </Button>
              </Link>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user?.firstName}!
            </h1>
            <p className={getAccentText()}>
              Here’s your dashboard overview.
            </p>
          </div>

          {/* Upcoming Appointment */}
          <Card
            variant="glass"
            className={`border ${
              isDarkMode
                ? "border-purple-500/20 bg-slate-800/60 backdrop-blur-lg text-white"
                : "border-gray-200 bg-white shadow text-black"
            } max-w-xl mb-8`}
          >
            <h2 className="text-2xl font-semibold mb-4">Next Appointment</h2>
            {nextAppointment ? (
              <div>
                <p>
                  <span className="font-semibold">Doctor:</span>{" "}
                  {nextAppointment.doctorName}
                </p>
                <p>
                  <span className="font-semibold">Specialty:</span>{" "}
                  {nextAppointment.specialty}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(nextAppointment.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {nextAppointment.time}
                </p>
                <p>
                  <span className="font-semibold">Reason:</span>{" "}
                  {nextAppointment.reason}
                </p>
              </div>
            ) : (
              <p className={getAccentText()}>
                No upcoming appointments.{" "}
                <Link
                  to="/appointments"
                  className="text-purple-500 underline hover:text-purple-600"
                >
                  Book one now
                </Link>
                .
              </p>
            )}
          </Card>

          {/* Other dashboard widgets can go here */}
        </main>
      </div>
    </div>
  );
};
