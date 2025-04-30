'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import AppointmentModal from '../components/Appointments/AppointmentModal';
import AppointmentList from '../components/Appointments/AppointmentList';
import { useAppointmentContext } from '../context/AppointmentContext';
import Toast from '../components/UI/Toast';

const AppointmentsPage = () => {
  const {
    appointments,
    isModalOpen,
    closeModal,
    modalMode,
    selectedAppointment,
    handleEditAppointment,
    notification
  } = useAppointmentContext();

  return (
    <>
      <SignedIn>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-bold text-[var(--heading-text)]">
              All Appointments
            </h1>
          </div>

          <div className="bg-[var(--color-bg)] rounded-xl shadow-md p-6 border border-[var(--color-border)]">
            <AppointmentList
              appointments={appointments}
              onEdit={handleEditAppointment}
              emptyMessage="No appointments found."
              showDateHeader={true}
            />
          </div>

          {isModalOpen && (
            <AppointmentModal
              isOpen={isModalOpen}
              onClose={closeModal}
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

export default AppointmentsPage;