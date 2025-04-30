'use client';

import { useState } from 'react';
import { useAppointmentContext } from '../../context/AppointmentContext';

export default function CalendarDay({ day, isSelected, isToday, appointments, onClick }) {
  const { doctorColorMap } = useAppointmentContext(); // <-- Get color mapping from context
  const { date, isCurrentMonth } = day;

  // Check if the date is in the past
  const isPastDate = date < new Date().setHours(0, 0, 0, 0); // Compare only the date part (ignoring time)

  // State for showing tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  // Apply the necessary classes based on the status of the day (selected, today, past, etc.)
  const dayClasses = `appointment-cell cursor-pointer
    ${isSelected ? 'bg-blue-100 border-blue-400' : ''}
    ${isToday ? 'today' : ''}
    ${!isCurrentMonth ? 'different-month' : ''}
    ${isPastDate ? 'bg-gray-200 cursor-not-allowed' : ''} // Grayscale and disable pointer events for past dates
  `;

  // Handle the click event; prevent clicks on past dates
  const handleClick = () => {
    if (!isPastDate) {
      onClick();
    }
  };

  return (
    <div
      className={dayClasses}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(isPastDate)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip for past dates */}
      {showTooltip && isPastDate && (
        <div className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-10 bottom-0 left-1/2 transform -translate-x-1/2 mt-1">
          Can't book on past dates
        </div>
      )}

      <div className="flex justify-between items-start">
        <span
          className={`text-sm font-medium ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}
        >
          {date.getDate()}
        </span>
        {isCurrentMonth && appointments.length > 0 && (
          <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-1.5">
            {appointments.length}
          </span>
        )}
      </div>

      <div className="mt-1 space-y-1 max-h-16 overflow-hidden">
        {appointments.slice(0, 2).map((appointment) => {
          const color = doctorColorMap[appointment.doctor] || 'bg-gray-400';
          return (
            <div
              key={appointment.id}
              className={`appointment-badge text-white text-xs font-medium px-2 py-0.5 rounded ${color}`}
              title={appointment.doctor}
            >
              {appointment.time} - {appointment.doctor}
            </div>
          );
        })}
        {appointments.length > 2 && (
          <div className="text-xs text-gray-500 font-medium">
            +{appointments.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
}
