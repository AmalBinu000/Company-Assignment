'use client';

export default function DayView({ selectedDate, appointments, onDateSelect }) {
    {/* Filter appointments for the selected day*/ }
    const dayAppointments = appointments.filter((appt) => {
        const apptDate = new Date(appt.date);
        return (
            apptDate.getFullYear() === selectedDate.getFullYear() &&
            apptDate.getMonth() === selectedDate.getMonth() &&
            apptDate.getDate() === selectedDate.getDate()
        );
    });

    {/* Parse time string to get hours and minutes */ }
    const parseTimeString = (timeStr) => {
        if (!timeStr) return { hours: 0, minutes: 0 };

        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

        {/* Convert to 24-hour format */ }
        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        return { hours, minutes };
    };

    {/* Generate time slots (7am to 9pm) */ }
    const timeSlots = [];
    for (let hour = 7; hour <= 21; hour++) {
        timeSlots.push({
            hour,
            minute: 0,
            displayTime: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`
        });
        if (hour !== 21) {
            timeSlots.push({
                hour,
                minute: 30,
                displayTime: `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour >= 12 ? 'PM' : 'AM'}`
            });
        }
    }

    {/* Helper function to find appointments for a specific time slot */ }
    const findAppointmentsAtTime = (hour, minute) => {
        return dayAppointments.filter(appt => {
            { /* Use startTime if available, fallback to time */ }
            const timeStr = appt.startTime || appt.time;
            if (!timeStr) return false;

            const { hours, minutes } = parseTimeString(timeStr);

            {/* Check if this appointment starts at this time slot */ }
            if (hours === hour && (
                (minute === 0 && minutes < 30) ||
                (minute === 30 && minutes >= 30)
            )) {
                return true;
            }

            {/* Calculate end time and check if appointment spans this time slot */ }
            if (appt.duration) {
                const startMinutes = hours * 60 + minutes;
                const endMinutes = startMinutes + appt.duration;
                const slotMinutes = hour * 60 + minute;

                {/* Check if this slot is within the appointment duration */ }
                return slotMinutes > startMinutes && slotMinutes < endMinutes;
            }

            {/* If we have explicit end time */ }
            if (appt.endTime) {
                const { hours: endHours, minutes: endMinutes } = parseTimeString(appt.endTime);
                const startMinutes = hours * 60 + minutes;
                const endTotalMinutes = endHours * 60 + endMinutes;
                const slotMinutes = hour * 60 + minute;

                {/* Check if this slot is within the appointment duration */ }
                return slotMinutes > startMinutes && slotMinutes < endTotalMinutes;
            }

            return false;
        });
    };

    {/* Navigate to previous day */ }
    const goToPreviousDay = () => {
        const prevDay = new Date(selectedDate);
        prevDay.setDate(prevDay.getDate() - 1);
        onDateSelect(prevDay);
    };

    {/* Navigate to next day */ }
    const goToNextDay = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        onDateSelect(nextDay);
    };

    {/* Check if an appointment is continuing from previous slot */ }
    const isContinuingAppointment = (appt, hour, minute) => {
        const timeStr = appt.startTime || appt.time;
        if (!timeStr) return false;

        const { hours, minutes } = parseTimeString(timeStr);
        const slotMinutes = hour * 60 + minute;
        const startMinutes = hours * 60 + minutes;

        return slotMinutes > startMinutes;
    };

    return (
        <div className="p-4 border mt-4 border-[var(--color-border)] rounded-lg bg-[var(--color-bg)] shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousDay}
                    className="p-2 rounded-full hover:bg-[var(--calendar-hover)] text-[var(--color-text)]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold text-[var(--heading-text)]">
                    {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </h2>

                <button
                    onClick={goToNextDay}
                    className="p-2 rounded-full hover:bg-[var(--calendar-hover)] text-[var(--color-text)]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="text-center mb-2">
                <button
                    onClick={() => onDateSelect(new Date())}
                    className="px-3 py-1 text-sm bg-[var(--color-muted)] hover:bg-[var(--calendar-hover)] rounded-md text-[var(--color-text)]"
                >
                    Today
                </button>
            </div>

            <div className="grid grid-cols-1 gap-px bg-[var(--color-border)] overflow-y-auto rounded-lg" style={{ maxHeight: '70vh' }}>
                {timeSlots.map((timeSlot, index) => {
                    const appointmentsAtTime = findAppointmentsAtTime(timeSlot.hour, timeSlot.minute);

                    return (
                        <div key={index} className="bg-[var(--color-bg)] p-2 min-h-16 border-b border-[var(--color-border)] grid grid-cols-6">
                            <div className="text-[var(--color-muted-text)] col-span-1 flex items-center">
                                {timeSlot.displayTime}
                            </div>
                            <div className="col-span-5">
                                {appointmentsAtTime.length > 0 ? (
                                    <div className="space-y-2">
                                        {appointmentsAtTime.map((appt, idx) => {
                                            const continuing = isContinuingAppointment(appt, timeSlot.hour, timeSlot.minute);
                                            const startTime = appt.startTime || appt.time;
                                            const endTime = appt.endTime || '';

                                            return (
                                                <div key={appt.id || `day-appt-${idx}`}
                                                    className={`${continuing ? 'bg-[var(--color-accent)] border-l-4 border-[var(--color-accent-text)]' : 'bg-[var(--color-accent)] border-l-4 border-[var(--color-primary)]'} 
                                                    p-2 rounded shadow-sm hover:shadow transition-shadow`}>
                                                    {!continuing ? (
                                                        <>
                                                            <div className="font-medium flex justify-between">
                                                                <span className="text-[var(--color-accent-text)]">{startTime} - {endTime}</span>
                                                                <span className="text-[var(--color-accent-text)]">{appt.doctor}</span>
                                                            </div>
                                                            <div className="text-sm flex justify-between mt-1">
                                                                <span className="text-[var(--color-accent-text)]">{appt.name}</span>
                                                                {appt.duration && (
                                                                    <span className="text-[var(--color-muted-text)] text-xs">
                                                                        {appt.duration} min
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {appt.reason && (
                                                                <div className="text-xs text-[var(--color-muted-text)] mt-1 italic">
                                                                    {appt.reason}
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="text-xs text-[var(--color-muted-text)] italic">
                                                            (Appointment in progress)
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="h-full w-full flex items-center">
                                        <div className="border border-dashed border-[var(--color-border)] rounded-md w-full py-1 text-center text-[var(--color-muted-text)] text-sm">
                                            Available
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}