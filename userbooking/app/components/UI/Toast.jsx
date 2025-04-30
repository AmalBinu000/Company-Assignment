'use client';

import React, { useEffect, useState } from 'react';


export default function Toast({ message, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('toast-enter');

  useEffect(() => {
    // Show the toast
    setIsVisible(true);
    setAnimationClass('toast-enter');

    // Start hide animation
    const hideTimer = setTimeout(() => {
      setAnimationClass('toast-exit');
    }, duration - 300); // Start animation 300ms before total duration

    // Hide the toast
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [message, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <div
        className={`${animationClass} bg-blue-600 text-white px-4 py-3 rounded-md shadow-lg`}
      >
        {message}
      </div>
    </div>
  );
}