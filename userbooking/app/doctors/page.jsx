'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAppointmentContext } from '../context/AppointmentContext';

export default function DoctorsPage() {
  const { Doctors } = useAppointmentContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter doctors based on the search query
  const filteredDoctors = Doctors.filter((doctor) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(lowerCaseSearch) ||
      doctor.specialty.toLowerCase().includes(lowerCaseSearch)
    );
  });

  return (
    <div className="py-3 px-1.5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[var(--heading-text)] mb-6">Our Doctors</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search doctors by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-[var(--color-border)] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-md p-5 transition hover:shadow-lg"
          >
            <Image
              src="/doctor.png"
              alt={doctor.name}
              width={80}
              height={80}
              className="rounded-full mb-4 object-cover mx-auto"
            />
            <div className="text-center">
              <h2 className="text-lg font-semibold text-[var(--heading-text)]">{doctor.name}</h2>
              <p className="text-sm text-[var(--paragraph-text)]">{doctor.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
