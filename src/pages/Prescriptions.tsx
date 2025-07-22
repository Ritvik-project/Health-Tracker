import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  User,
  Pill as Pills,
  Clock,
  Plus,
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { v4 as uuidv4 } from 'uuid';
import { useReminders } from '../context/RemindersContext';

export const Prescriptions: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { reminders, addReminder } = useReminders();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    id: '',
    date: '',
    doctorName: '',
    instructions: '',
    medications: [],
  });

  const [currentMed, setCurrentMed] = useState({
    name: '',
    dosage: '',
    duration: '',
    frequency: '',
  });

  const wrapperClass = `min-h-screen transition-colors duration-300 ${
    isDarkMode
      ? 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white'
      : 'bg-gray-100 text-gray-900'
  }`;

  const cardStyle = `
    border backdrop-blur-lg
    ${
      isDarkMode
        ? 'border-purple-500/20 bg-slate-800/60 text-white'
        : 'border-gray-200 bg-white text-black shadow'
    }`;

  const accentText = isDarkMode ? 'text-purple-300' : 'text-gray-600';

  const saveReminder = () => {
    if (!form.doctorName || !form.date || form.medications.length === 0) {
      return alert('Please fill all required fields.');
    }

    addReminder({
      ...form,
      id: uuidv4(),
    });

    setForm({
      id: '',
      date: '',
      doctorName: '',
      instructions: '',
      medications: [],
    });

    setShowForm(false);
  };

  const addMedication = () => {
    if (
      !currentMed.name ||
      !currentMed.dosage ||
      !currentMed.duration ||
      !currentMed.frequency
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      medications: [...prev.medications, currentMed],
    }));

    setCurrentMed({ name: '', dosage: '', duration: '', frequency: '' });
  };

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Reminders</h1>
            <p className={`mt-2 ${accentText}`}>
              View and manage reminders
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" /> Add Reminder
          </Button>
        </div>

        {showForm && (
          <Card variant="glass" className={`p-6 mb-8 ${cardStyle}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Doctor Name"
                value={form.doctorName}
                onChange={(e) =>
                  setForm({ ...form, doctorName: e.target.value })
                }
              />
              <Input
                label="Date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Add Medications</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Name"
                  value={currentMed.name}
                  onChange={(e) =>
                    setCurrentMed({ ...currentMed, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Dosage"
                  value={currentMed.dosage}
                  onChange={(e) =>
                    setCurrentMed({ ...currentMed, dosage: e.target.value })
                  }
                />
                <Input
                  placeholder="Frequency"
                  value={currentMed.frequency}
                  onChange={(e) =>
                    setCurrentMed({ ...currentMed, frequency: e.target.value })
                  }
                />
                <Input
                  placeholder="Duration"
                  value={currentMed.duration}
                  onChange={(e) =>
                    setCurrentMed({ ...currentMed, duration: e.target.value })
                  }
                />
              </div>
              <Button className="mt-4" onClick={addMedication}>
                Add Medication
              </Button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Instructions
              </label>
              <textarea
                className={`w-full p-2 rounded border ${
                  isDarkMode
                    ? 'bg-purple-800/20 text-white border-purple-500/30 placeholder-purple-400'
                    : 'bg-white text-black border-gray-300'
                }`}
                rows={4}
                value={form.instructions}
                onChange={(e) =>
                  setForm({ ...form, instructions: e.target.value })
                }
              />
            </div>

            <Button className="mt-6" onClick={saveReminder}>
              Save Reminder
            </Button>
          </Card>
        )}

        <div className="space-y-6">
          {reminders.map((r, index) => (
            <Card key={r.id} variant="glass" className={cardStyle}>
              <div className="border-b border-purple-500/20 pb-4 mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${
                        isDarkMode ? 'bg-purple-700/30' : 'bg-purple-100'
                      } w-12 h-12 rounded-full flex items-center justify-center`}
                    >
                      <FileText className={`${accentText} h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Reminder #{index + 1}
                      </h3>
                      <div
                        className={`flex items-center space-x-4 mt-1 text-sm ${accentText}`}
                      >
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{r.doctorName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(r.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Medications */}
                <div>
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <Pills className="h-5 w-5 mr-2 text-purple-300" /> Medications
                  </h4>
                  <div className="space-y-4">
                    {r.medications.map((med, i) => (
                      <div
                        key={i}
                        className={`${
                          isDarkMode
                            ? 'bg-purple-800/20 text-purple-200'
                            : 'bg-purple-100 text-purple-900'
                        } rounded-lg p-4 transition`}
                      >
                        <h5 className="font-semibold mb-2">{med.name}</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><b>Dosage:</b> {med.dosage}</div>
                          <div><b>Duration:</b> {med.duration}</div>
                          <div className="col-span-2"><b>Frequency:</b> {med.frequency}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-purple-300" /> Instructions
                  </h4>
                  <div
                    className={`${
                      isDarkMode
                        ? 'bg-purple-800/20 text-purple-200'
                        : 'bg-purple-100 text-purple-900'
                    } p-4 rounded-lg`}
                  >
                    <p className="leading-relaxed">{r.instructions}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`mt-6 pt-4 border-t border-purple-500/20 flex justify-between text-sm ${accentText}`}>
                <span>Reminder set for {new Date(r.date).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}

          {reminders.length === 0 && (
            <Card variant="glass" className={cardStyle}>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reminders found</h3>
                <p className={accentText}>
                  Your medication reminders will appear here.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
