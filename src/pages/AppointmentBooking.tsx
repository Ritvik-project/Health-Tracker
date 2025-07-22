import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Calendar, Clock, User, Star, CheckCircle } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { mockDoctors, generateTimeSlots } from "../data/mockData";
import { Doctor, TimeSlot } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useAppointments } from "../context/AppointmentsContext";
import { useAuth } from "../context/AuthContext";

export const AppointmentBooking: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { addAppointment } = useAppointments();
  const { user } = useAuth();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isBooked, setIsBooked] = useState(false);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    if (date) {
      setTimeSlots(generateTimeSlots(date));
    }
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && reason && user?.id) {
      const newAppointment = {
        id: uuidv4(),
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: selectedDate,
        time: selectedTime,
        reason,
        status: "upcoming",
        userId: user.id,
      };

      addAppointment(newAppointment);
      setIsBooked(true);
    } else {
      alert("Please complete all fields and ensure you are logged in.");
    }
  };

  const resetForm = () => {
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setReason("");
    setTimeSlots([]);
    setIsBooked(false);
  };

  const wrapperClass = `min-h-screen transition-colors duration-300 ${
    isDarkMode
      ? "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white"
      : "bg-gray-100 text-gray-900"
  }`;

  const cardClass = `
    border backdrop-blur-lg
    ${
      isDarkMode
        ? "border-purple-500/20 bg-slate-800/60 text-white"
        : "border-gray-200 bg-white shadow text-black"
    }
  `;

  const accentText = isDarkMode ? "text-purple-300" : "text-gray-600";

  if (isBooked) {
    return (
      <div className={`${wrapperClass} flex items-center justify-center p-4`}>
        <Card variant="glass" className={`max-w-md text-center ${cardClass}`}>
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
          <p className={`${accentText} mb-6`}>
            Your appointment with {selectedDoctor?.name} is confirmed for{" "}
            {new Date(selectedDate).toLocaleDateString()} at {selectedTime}.
          </p>
          <div className="space-y-3">
            <Button onClick={resetForm} variant="outline" className="w-full">
              Book Another Appointment
            </Button>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
        <div className="flex gap-8">
          <div className="flex-1 space-y-6">
            <Card variant="glass" className={cardClass}>
              <h2 className="text-xl font-semibold mb-4">Choose Your Doctor</h2>
              <div className="space-y-4">
                {mockDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? "border-purple-500 bg-purple-500/10"
                        : isDarkMode
                        ? "border-white/10 hover:border-purple-400/40"
                        : "border-gray-300 hover:border-purple-400"
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {doctor.name}
                        </h3>
                        <p className={`font-medium ${accentText}`}>
                          {doctor.specialty}
                        </p>
                        <div
                          className={`flex items-center space-x-4 mt-2 text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{doctor.rating}</span>
                          </div>
                          <span>{doctor.experience} experience</span>
                        </div>
                      </div>
                      {selectedDoctor?.id === doctor.id && (
                        <CheckCircle className="h-6 w-6 text-purple-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedDoctor && (
              <Card variant="glass" className={cardClass}>
                <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
                <Input
                  type="date"
                  label="Appointment Date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  icon={<Calendar className="h-5 w-5 text-purple-300" />}
                  className="mb-4"
                />

                {timeSlots.length > 0 && (
                  <>
                    <label className={`block text-sm font-medium mb-3 ${accentText}`}>
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 text-sm rounded-lg border transition-all ${
                            slot.available
                              ? selectedTime === slot.time
                                ? "border-purple-500 bg-purple-600 text-white"
                                : `border-purple-400/20 hover:border-purple-400/40 ${
                                    isDarkMode
                                      ? "hover:bg-purple-800/20 text-white"
                                      : "hover:bg-purple-100 text-black"
                                  }`
                              : "border-gray-600 bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </Card>
            )}
          </div>

          <div className="w-96 sticky top-10 self-start">
            <Card variant="glass" className={cardClass}>
              <h2 className="text-xl font-semibold mb-4">Appointment Summary</h2>
              {selectedDoctor ? (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={selectedDoctor.avatar}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{selectedDoctor.name}</p>
                      <p className={`text-sm ${accentText}`}>
                        {selectedDoctor.specialty}
                      </p>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className={`flex items-center space-x-2 ${accentText} mb-2`}>
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className={`flex items-center space-x-2 ${accentText} mb-2`}>
                      <Clock className="h-4 w-4" />
                      <span>{selectedTime}</span>
                    </div>
                  )}

                  <Input
                    label="Reason for Visit"
                    placeholder="Brief description of your concern"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mb-4"
                  />

                  <Button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || !reason}
                    className="w-full"
                    size="lg"
                  >
                    Book Appointment
                  </Button>
                </>
              ) : (
                <div className={`text-center py-8 ${accentText}`}>
                  <User className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <p>Select a doctor to continue</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
