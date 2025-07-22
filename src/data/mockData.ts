import { Doctor, Appointment, Prescription, TimeSlot } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Kushagra',
    specialty: 'Cardiologist',
    avatar: 'https://imgs.search.brave.com/To45sdVfm7qnsGXsZUGZphCw0eeO4oeaTjj3LqCdXMo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzY5LzU1LzM0/LzM2MF9GXzM2OTU1/MzQ5NV9NaUdqeTBU/dEZkbTVhalZXS1Rq/NlpjVG12NlQwbXJs/eS5qcGc',
    rating: 4.7,
    experience: '13 years'
  },
  {
    id: '2',
    name: 'Ojas Varshney',
    specialty: 'Neurologist',
    avatar: 'https://imgs.search.brave.com/hpsW5C9aGDlkBv5M8p-zboa74M7T7SUqVavC1o6oDp4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzE2LzMyLzkz/LzM2MF9GXzcxNjMy/OTM3N19VdGdiNnRN/cW5DVXREdGlsUmdm/M01wZ1RPRGxua3hN/Vi5qcGc',
    rating: 4.9,
    experience: '11 years'
  },
  {
    id: '3',
    name: 'Mahesh PV',
    specialty: 'Dermatologist',
    avatar: 'https://imgs.search.brave.com/MsZ7v34Qco5I6I9Ehm4xlVz24MfK2NsFCkZ3Q21TwoQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/OTk0MDIyMi92ZWN0/b3IvZWxlZ2FudC1n/b2xkLW0tbGV0dGVy/LWZsb3JhbC12aW50/YWdlLWNsYXNzaWMt/b3JuYXRlLWxldHRl/ci12ZWN0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTYx/RmdqdDNqWDJnS1Qy/emVsaFduQV9lcVl4/SUUxbVYzNl85YU02/UDRHYkk9',
    rating: 4.5,
    experience: '16 years'
  },
  {
    id: '4',
    name: 'Sandeep Kumar',
    specialty: 'Orthopedic Surgeon',
    avatar: 'https://imgs.search.brave.com/ZEW0TaMYOeS48fAXAFW94-oqJs0yXvGccb7UuIoGmEA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/MDkyODMyNy92ZWN0/b3Ivcy1sZXR0ZXIt/aW5pdGlhbC1sdXh1/cmlvdXMtbG9nby10/ZW1wbGF0ZS1wcmVt/aXVtLXMtbG9nby1n/b2xkZW4tY29uY2Vw/dC1zLWxldHRlci13/aXRoLWdvbGRlbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/Y3M1SlNEeGFjUjlU/Qnh3YmhnSGxIaXZ6/UU83blpEdEZlMmZJ/Um1ZRTJXYz0',
    rating: 4.8,
    experience: '10 years'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Kushagra',
    specialty: 'Cardiologist',
    date: '2025-01-15',
    time: '10:00 AM',
    status: 'upcoming',
    reason: 'Regular checkup'
  },
  {
    id: '2',
    doctorId: '3',
    doctorName: 'Ojas Varshney',
    specialty: 'Dermatologist',
    date: '2025-01-20',
    time: '2:30 PM',
    status: 'upcoming',
    reason: 'Skin consultation'
  },
  {
    id: '3',
    doctorId: '2',
    doctorName: 'Mahesh PV',
    specialty: 'Neurologist',
    date: '2025-01-05',
    time: '11:15 AM',
    status: 'completed',
    reason: 'Follow-up visit'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    doctorName: 'Kushagra',
    date: '2025-01-05',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days'
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily with meals',
        duration: '90 days'
      }
    ],
    instructions: 'Take medications as prescribed. Monitor blood pressure daily.'
  },
  {
    id: '2',
    doctorName: 'Ojas Varshney',
    date: '2024-12-20',
    medications: [
      {
        name: 'Hydrocortisone Cream',
        dosage: '1%',
        frequency: 'Apply twice daily',
        duration: '14 days'
      }
    ],
    instructions: 'Apply to affected area only. Avoid contact with eyes.'
  }
];

export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];
  
  times.forEach(time => {
    slots.push({
      time,
      available: Math.random() > 0.3 // Randomly make some slots unavailable
    });
  });
  
  return slots;
};