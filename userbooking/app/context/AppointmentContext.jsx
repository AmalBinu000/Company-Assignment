'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointmentContext must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const Doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrician' },
    { id: 4, name: 'Dr. David Kumar', specialty: 'Neurologist' },
    { id: 5, name: 'Dr. Lisa Martinez', specialty: 'Orthopedic Surgeon' },
    { id: 6, name: 'Dr. Robert Wilson', specialty: 'Ophthalmologist' },
    { id: 7, name: 'Dr. Jennifer Lee', specialty: 'Gynecologist' },
    { id: 8, name: 'Dr. James Peterson', specialty: 'Psychiatrist' },
    { id: 9, name: 'Dr. Tharun vashisth', specialty: 'Neuro Surgeon' },
    { id: 10, name: 'Dr. Adithyan A S', specialty: 'Gynecologist' }
];

  // Load appointments from localStorage
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  // Save appointments to localStorage whenever they change (even empty array)
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
    showNotification('Appointment booked successfully!');
    return newAppointment;
  };

  const updateAppointment = (id, updatedAppointment) => {
    const updated = appointments.map((appointment) =>
      appointment.id === id ? { ...updatedAppointment, id } : appointment
    );
    setAppointments(updated);
    showNotification('Appointment updated successfully!');
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
    showNotification('Appointment deleted successfully!');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setModalMode('create');
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(new Date(appointment.date));
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const colorClasses = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500','bg-red-500', 'bg-yellow-500', 'bg-teal-500', 'bg-indigo-500', 'bg-gray-500'];

    const doctorColorMap = Doctors.reduce((map, doctor, index) => {
    map[doctor.name] = colorClasses[index % colorClasses.length];
    return map;
    }, {});


  const getFilteredAppointments = () => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        notification,
        selectedDate,
        setSelectedDate,
        isModalOpen,
        setIsModalOpen,
        modalMode,
        setModalMode,
        selectedAppointment,
        setSelectedAppointment,
        handleDayClick,
        handleEditAppointment,
        closeModal,
        getFilteredAppointments,
        Doctors,
        doctorColorMap
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
