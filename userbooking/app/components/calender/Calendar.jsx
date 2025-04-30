'use client';

import { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';

export default function Calendar({ selectedDate, onDateSelect, onDayClick, appointments }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Calculate calendar days when month changes
  useEffect(() => {
    const days = getCalendarDays(currentMonth);
    setCalendarDays(days);
  }, [currentMonth]);

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of the week of the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Calculate total days in the calendar (always showing 6 weeks)
    const totalDays = 42; // 6 weeks * 7 days
    
    // Create array of all days to show on calendar
    const calendarDays = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = prevMonthDays - firstDayOfWeek + 1; i <= prevMonthDays; i++) {
      calendarDays.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      calendarDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month
    const remainingDays = totalDays - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onDateSelect(today);
  };

  const isPastDate = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date
    return day.date < today;
  };

  return (
    <div className="calendar">
      <CalendarHeader 
        currentMonth={currentMonth} 
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />
      
      {/* Day names header */}
      <div className="appointment-grid text-center py-2 border-b font-medium text-gray-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-sm">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="appointment-grid">
        {calendarDays.map((day, index) => {
          // Get appointments for this day
          const dayAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return (
              appointmentDate.getDate() === day.date.getDate() &&
              appointmentDate.getMonth() === day.date.getMonth() &&
              appointmentDate.getFullYear() === day.date.getFullYear()
            );
          });

          // Check if the day is a past day
          const isPast = isPastDate(day);

          return (
            <CalendarDay 
              key={index}
              day={day}
              isSelected={
                selectedDate &&
                selectedDate.getDate() === day.date.getDate() &&
                selectedDate.getMonth() === day.date.getMonth() &&
                selectedDate.getFullYear() === day.date.getFullYear()
              }
              isToday={
                new Date().getDate() === day.date.getDate() &&
                new Date().getMonth() === day.date.getMonth() &&
                new Date().getFullYear() === day.date.getFullYear()
              }
              appointments={dayAppointments}
              onClick={() => {
                if (!isPast) {
                  onDateSelect(day.date);
                  onDayClick(day.date);
                }
              }}
              isDisabled={isPast} // Disable past dates
            />
          );
        })}
      </div>
    </div>
  );
}
