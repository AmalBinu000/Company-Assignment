'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import CalendarContainer from './components/calender/CalendarContainer';
import AppointmentModal from './components/Appointments/AppointmentModal';
import AppointmentList from './components/Appointments/AppointmentList';
import { useAppointmentContext } from './context/AppointmentContext';
import Toast from './components/UI/Toast';
import HeroBanner from './components/UI/HeroBanner';

export default function Home() {
  const {
    selectedDate,
    handleDayClick,
    isModalOpen,
    closeModal,
    modalMode,
    selectedAppointment,
    getFilteredAppointments,
    notification,
    setSelectedDate,
    appointments,
    handleEditAppointment
  } = useAppointmentContext();

  const filteredAppointments = getFilteredAppointments();

  return (
    <>
      <SignedIn>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-bold text-[var(--heading-text)]">
              Doctor Appointment System
            </h1>
          </div>
          <HeroBanner />

          <div className="bg-[var(--color-bg)] rounded-xl shadow-md overflow-hidden border border-[var(--color-border)]">
            <CalendarContainer
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onDayClick={handleDayClick}
              appointments={appointments}
            />
          </div>

          {filteredAppointments.length > 0 && (
            <div className="bg-[var(--color-bg)] rounded-xl shadow-md p-6 border border-[var(--color-border)]">
              <h2 className="text-xl font-semibold mb-4 text-[var(--heading-text)]">
                Appointments for {selectedDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h2>
              <AppointmentList
                appointments={filteredAppointments}
                onEdit={handleEditAppointment}
              />
            </div>
          )}

          {isModalOpen && (
            <AppointmentModal
              isOpen={isModalOpen}
              onClose={closeModal}
              selectedDate={selectedDate}
              appointment={selectedAppointment}
              mode={modalMode}
            />
          )}

          {notification && <Toast message={notification} />}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}