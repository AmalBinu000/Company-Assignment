'use client';

import { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import AppointmentForm from './AppointmentForm';
import Button from '../UI/Button';
import { useAppointmentContext } from '../../context/AppointmentContext';

export default function AppointmentModal({ isOpen, onClose, selectedDate, appointment, mode }) {
  const { deleteAppointment } = useAppointmentContext();
  const [formMode, setFormMode] = useState(mode || 'create');

  useEffect(() => {
    setFormMode(mode);
  }, [mode]);

  const handleDelete = () => {
    if (appointment?.id) {
      deleteAppointment(appointment.id);
      onClose();
    }
  };

  const getTitle = () => {
    switch (formMode) {
      case 'create':
        return 'Book New Appointment';
      case 'edit':
        return 'Edit Appointment';
      case 'view':
        return 'Appointment Details';
      default:
        return 'Appointment';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[var(--color-bg)] rounded-lg shadow-xl max-w-2xl w-full p-6 relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--heading-text)]">{getTitle()}</h2>

          <AppointmentForm
            selectedDate={selectedDate}
            appointment={appointment}
            mode={formMode}
            onSuccess={onClose}
            onCancel={onClose}
          />

          {formMode === 'edit' && appointment && (
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <Button
                onClick={handleDelete}
                variant="danger"
                className="w-full"
              >
                Delete Appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
