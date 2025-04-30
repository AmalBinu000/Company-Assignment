'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

export default function Header() {
    const { isSignedIn, user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-[var(--color-bg)] shadow border-b border-[var(--color-border)]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/logo.png" alt="Medico Logo" width={70} height={70} />
                        <span className="text-xl font-bold text-[var(--color-primary)] hidden sm:inline">Medico</span>
                    </Link>

                    {/* Main Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition">
                            Home
                        </Link>
                        <Link href="/appointments" className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition">
                            Appointments
                        </Link>
                        <Link
                            href="/doctors"
                            className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Doctors
                        </Link>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Authentication */}
                        <div className="flex items-center space-x-4">
                            {isSignedIn ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-[var(--color-text)]">
                                        Welcome, {user.firstName || user.username}
                                    </span>
                                    <UserButton
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-10 h-10 rounded-full"
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="bg-[var(--color-primary)] text-[var(--color-primary-text)] px-4 py-2 rounded-md hover:opacity-90 transition">
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6 text-[var(--color-text)]"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[var(--color-border)]">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/appointments"
                                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Appointments
                            </Link>
                            <Link
                                href="/doctors"
                                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Doctors
                            </Link>

                            {/* Theme Toggle for Mobile */}
                            <div className="py-2">
                                <ThemeToggle />
                            </div>

                            {isSignedIn ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-[var(--color-text)]">
                                        Welcome, {user.firstName || user.username}
                                    </span>
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="bg-[var(--color-primary)] text-[var(--color-primary-text)] px-4 py-2 rounded-md hover:opacity-90 transition">
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
