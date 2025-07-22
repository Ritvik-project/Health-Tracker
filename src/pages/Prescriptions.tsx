import React from 'react';
import {
  FileText,
  Calendar,
  User,
  Pill as Pills,
  Clock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // ✅ Global theme hook
import { Card } from '../components/ui/Card';
import { mockPrescriptions } from '../data/mockData';

export const Prescriptions: React.FC = () => {
  const { isDarkMode } = useTheme(); // ✅ Access theme

  const wrapperClass = `min-h-screen transition-colors duration-300 ${
    isDarkMode
      ? 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white'
      : 'bg-gray-100 text-gray-900'
  }`;

  const cardStyle = `
    border backdrop-blur-lg
    ${isDarkMode
      ? 'border-purple-500/20 bg-slate-800/60 text-white'
      : 'border-gray-200 bg-white text-black shadow'
    }
  `;

  const accentText = isDarkMode ? 'text-purple-300' : 'text-gray-600';
  const subText = isDarkMode ? 'text-purple-200' : 'text-gray-700';

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Prescriptions</h1>
          <p className={`mt-2 ${accentText}`}>
            View and manage your medical prescriptions
          </p>
        </div>

        <div className="space-y-6">
          {mockPrescriptions.map((prescription) => (
            <Card
              key={prescription.id}
              variant="glass"
              className={cardStyle}
            >
              {/* Header */}
              <div className="border-b border-purple-500/20 pb-4 mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${isDarkMode ? 'bg-purple-700/30' : 'bg-purple-100'} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <FileText className={`${accentText} h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Prescription #{prescription.id}</h3>
                      <div className={`flex items-center space-x-4 mt-1 text-sm ${accentText}`}>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{prescription.doctorName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(prescription.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Medications */}
                <div>
                  <h4 className={`text-lg font-medium mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <Pills className="h-5 w-5 mr-2 text-purple-300" />
                    Medications
                  </h4>
                  <div className="space-y-4">
                    {prescription.medications.map((medication, index) => (
                      <div
                        key={index}
                        className={`${isDarkMode ? 'bg-purple-800/20 text-purple-200' : 'bg-purple-100 text-purple-900'} rounded-lg p-4 transition`}
                      >
                        <h5 className="font-semibold mb-2">
                          {medication.name}
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-purple-400">Dosage:</span>{' '}
                            {medication.dosage}
                          </div>
                          <div>
                            <span className="font-medium text-purple-400">Duration:</span>{' '}
                            {medication.duration}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium text-purple-400">Frequency:</span>{' '}
                            {medication.frequency}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className={`text-lg font-medium mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <Clock className="h-5 w-5 mr-2 text-purple-300" />
                    Instructions
                  </h4>

                  <div className={`${isDarkMode ? 'bg-purple-800/20 text-purple-200' : 'bg-purple-100 text-purple-900'} p-4 rounded-lg`}>
                    <p className="leading-relaxed">{prescription.instructions}</p>
                  </div>

                  <div className="mt-6">
                    <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Important Notes</h5>
                    <ul className={`text-sm ${accentText} space-y-1`}>
                      <li>• Take medications with food if stomach upset occurs</li>
                      <li>• Do not skip doses, even if you feel better</li>
                      <li>• Contact your doctor if you experience any side effects</li>
                      <li>• Store medications in a cool, dry place</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-purple-500/20">
                <div className={`flex items-center justify-between text-sm ${accentText}`}>
                  <div>
                    Prescription issued on{' '}
                    {new Date(prescription.date).toLocaleDateString()}
                  </div>
                  <button className="hover:text-purple-400 font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {/* No Prescriptions */}
          {mockPrescriptions.length === 0 && (
            <Card variant="glass" className={cardStyle}>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Prescriptions Found</h3>
                <p className={accentText}>
                  Your prescriptions from doctors will appear here
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
