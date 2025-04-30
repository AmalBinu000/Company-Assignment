'use client';

import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-green-100 dark:bg-[var(--color-accent)] rounded-2xl p-6 shadow mb-6 md:space-x-6 border border-[var(--color-border)]">
      {/* Left Image */}
      <div className="mb-4 md:mb-0 md:w-1/4 flex justify-center">
        <Image
          src="/main.png"
          alt="Doctor Illustration"
          width={200}
          height={200}
          className="rounded-xl"
          priority
        />
      </div>

      {/* Text in the center */}
      <div className="md:w-2/4 text-center px-4">
        <h1 className="text-4xl font-bold text-green-800 dark:text-[var(--color-accent-text)] mb-2">
          Your Health, Our Priority
        </h1>
        <p className="text-green-700 dark:text-[var(--color-accent-text)] text-lg">
          Book your appointment now and get expert care from trusted professionals.
        </p>
      </div>

      {/* Right Image */}
      <div className="mb-4 md:mb-0 md:w-1/4 flex justify-center">
        <Image
          src="/family2.png"
          alt="Family Illustration"
          width={400}
          height={400}
          className="rounded-xl"
          priority
        />
      </div>
    </div>
  );
}
