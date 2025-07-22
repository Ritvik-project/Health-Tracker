import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
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
  
  // Sort by date to get the next one
  const sortedAppointments = [...upcomingAppointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextAppointment = sortedAppointments[0];

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

        {/* Main */}
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

          {/* Next Upcoming Appointment */}
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

          {/* All Upcoming Appointments as Cards */}
          <Card
            variant="glass"
            className={`border ${
              isDarkMode
                ? "border-purple-500/20 bg-slate-800/60 backdrop-blur-lg text-white"
                : "border-gray-200 bg-white shadow text-black"
            } max-w-4xl mb-8`}
          >
            <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {sortedAppointments.map((apt) => (
                  <Card
                    key={apt.id}
                    variant="outline"
                    className={`${
                      isDarkMode
                        ? "border-purple-400/40 bg-slate-800/50 text-white"
                        : "border-gray-200 bg-white shadow text-black"
                    } p-4`}
                  >
                    <h3 className="text-lg font-semibold mb-2 font-display">{apt.doctorName}</h3>
                    <p className="text-sm mb-1">
                      <strong>Specialty:</strong> {apt.specialty}
                    </p>
                    <p className="text-sm mb-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(apt.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm mb-1 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {apt.time}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Reason:</strong> {apt.reason}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={getAccentText()}>No appointments booked yet.</div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};
