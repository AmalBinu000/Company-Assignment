'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import WeekView from './WeekView';
import DayView from './DayView';

export default function CalendarContainer({ selectedDate, onDateSelect, onDayClick, appointments }) {
  const [view, setView] = useState('month');

  const renderView = () => {
    switch (view) {
      case 'month':
        return (
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            onDayClick={onDayClick}
            appointments={appointments}
          />
        );
      case 'week':
        return (
          <WeekView
            selectedDate={selectedDate}
            appointments={appointments}
            onDateSelect={onDateSelect}
            onDayClick={onDayClick}
          />
        );
      case 'day':
        return (
          <DayView
            selectedDate={selectedDate}
            appointments={appointments}
            onDateSelect={onDateSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* View Switch Buttons - Right-aligned with full border radius */}
      <div className="flex justify-end border border-[var(--color-border)] rounded-lg overflow-hidden mt-4 mx-4 w-fit ml-auto">
        {['month', 'week', 'day'].map((mode) => (
          <button
            key={mode}
            onClick={() => setView(mode)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${view === mode
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-text)]'
                : 'bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--calendar-hover)]'
              } ${mode === 'month' ? 'rounded-l-lg' :
                mode === 'day' ? 'rounded-r-lg' : ''
              }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {renderView()}
    </div>
  );
}
