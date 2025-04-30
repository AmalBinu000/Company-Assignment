'use client';

import { useState, useEffect } from 'react';
import Button from '../UI/Button';
import { useAppointmentContext } from '../../context/AppointmentContext';

{/* Available time slots */ }
const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

{/* Available durations */ }
const durations = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1 hour 30 minutes' },
  { value: 120, label: '2 hours' }
];

{/* Helper function to calculate end time */ }
const calculateEndTime = (startTime, durationMinutes) => {
  if (!startTime || !durationMinutes) return '';

  {/* Parse start time */ }
  const [time, period] = startTime.split(' ');
  let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

  {/* Convert to 24-hour format */ }
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  {/* Add duration */ }
  let totalMinutes = hours * 60 + minutes + durationMinutes;
  let endHours = Math.floor(totalMinutes / 60);
  let endMinutes = totalMinutes % 60;

  {/* Convert back to 12-hour format */ }
  let endPeriod = 'AM';
  if (endHours >= 12) {
    endPeriod = 'PM';
    if (endHours > 12) endHours -= 12;
  }
  if (endHours === 0) endHours = 12;

  return `${endHours}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
};

export default function AppointmentForm({ selectedDate, appointment, mode, onSuccess, onCancel }) {
  const { addAppointment, updateAppointment, Doctors } = useAppointmentContext();
  const [isReadOnly, setIsReadOnly] = useState(mode === 'view');
  const [endTime, setEndTime] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    specialty: '',
    startTime: '',
    endTime: '',
    duration: 30,
    phone: '',
    email: '',
    reason: '',
    date: selectedDate || new Date(),
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        startTime: appointment.startTime || appointment.time || '',
        duration: appointment.duration || 30,
        date: appointment.date ? new Date(appointment.date) : new Date(),
      });

      if (appointment.startTime && appointment.duration) {
        setEndTime(calculateEndTime(appointment.startTime, appointment.duration));
      }
    } else {
      setFormData({
        name: '',
        doctor: '',
        specialty: '',
        startTime: '',
        endTime: '',
        duration: 30,
        phone: '',
        email: '',
        reason: '',
        date: selectedDate || new Date(),
      });
      setEndTime('');
    }
  }, [appointment, selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctor') {
      const selectedDoctor = Doctors.find(d => d.name === value);
      if (selectedDoctor) {
        setFormData(prev => ({
          ...prev,
          doctor: value,
          specialty: selectedDoctor.specialty
        }));
      }
    } else if (name === 'startTime') {
      const newEndTime = calculateEndTime(value, formData.duration);
      setEndTime(newEndTime);
      setFormData(prev => ({ ...prev, startTime: value, endTime: newEndTime }));
    } else if (name === 'duration') {
      const durationValue = parseInt(value, 10);
      const newEndTime = calculateEndTime(formData.startTime, durationValue);
      setEndTime(newEndTime);
      setFormData(prev => ({ ...prev, duration: durationValue, endTime: newEndTime }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    {/* Calculate appointment end time */ }
    const finalEndTime = calculateEndTime(formData.startTime, formData.duration);

    const data = {
      ...formData,
      time: formData.startTime,     // Keep time field for backward compatibility
      startTime: formData.startTime,
      endTime: finalEndTime,
      date: formData.date ? formData.date.toISOString() : new Date().toISOString(),
    };

    if (mode === 'edit' && appointment) {
      updateAppointment(appointment.id, data);
    } else {
      addAppointment(data);
    }

    onSuccess();
  };

  const toggleEditMode = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Date</label>
          <input
            type="text"
            value={formData.date ? formData.date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }) : ''}
            disabled
            className="w-full px-3 py-2 bg-[var(--color-muted)] text-[var(--color-text)] border border-[var(--color-border)] rounded-md disabled:opacity-75"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Start Time</label>
            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
            >
              {durations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {formData.startTime && formData.duration && (
        <div className="bg-[var(--color-muted)] p-2 rounded border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text)]">
            Appointment time: <span className="font-medium">{formData.startTime} - {endTime}</span>
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Doctor</label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleInputChange}
          disabled={isReadOnly}
          required
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
        >
          <option value="">Select doctor</option>
          {Doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Patient Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isReadOnly}
          required
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isReadOnly}
            required
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isReadOnly}
            required
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--heading-text)] mb-1">Reason for Visit</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          disabled={isReadOnly}
          required
          rows={3}
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-text)]"
          placeholder="Describe your symptoms or reason for visit"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {mode === 'view' ? (
          <>
            <Button onClick={toggleEditMode} variant="secondary">Edit</Button>
            <Button onClick={onCancel}>Close</Button>
          </>
        ) : isReadOnly ? (
          <>
            <Button onClick={toggleEditMode} variant="secondary">Edit</Button>
            <Button onClick={onCancel}>Close</Button>
          </>
        ) : (
          <>
            <Button onClick={onCancel} variant="secondary">Cancel</Button>
            <Button type="submit" variant="primary">
              {mode === 'edit' ? 'Save Changes' : 'Book Appointment'}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}