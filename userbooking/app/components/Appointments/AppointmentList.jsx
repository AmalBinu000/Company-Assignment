'use client';

export default function AppointmentList({ appointments, onEdit }) {
  if (!appointments || appointments.length === 0) {
    return <p className="text-[var(--color-muted-text)]">No appointments scheduled for this date.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="border border-[var(--color-border)] rounded-lg p-4 hover:bg-[var(--calendar-hover)] transition cursor-pointer bg-[var(--color-bg)]"
          onClick={() => onEdit(appointment)}
        >
          <div className="flex justify-between">
            <div className="font-medium text-[var(--color-primary)]">{appointment.time}</div>
            <div className="text-sm text-[var(--color-muted-text)]">
              {new Date(appointment.date).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-2">
            <h3 className="font-semibold text-[var(--heading-text)]">{appointment.name}</h3>
            <p className="text-sm text-[var(--paragraph-text)] mt-1">
              <span className="font-medium text-[var(--color-primary)]">{appointment.doctor}</span> - {appointment.specialty}
            </p>
          </div>

          <div className="mt-2 text-sm text-[var(--color-muted-text)]">
            <p>Reason: {appointment.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

