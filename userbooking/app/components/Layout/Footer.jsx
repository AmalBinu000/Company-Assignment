'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-bg)] shadow-inner mt-auto border-t border-[var(--color-border)]">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[var(--color-primary)]">Medico</h3>
                        <p className="text-[var(--paragraph-text)] text-sm">
                            Providing quality healthcare services and easy appointment scheduling for our patients.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-[var(--heading-text)] mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-[var(--paragraph-text)] hover:text-[var(--color-primary)] text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/appointments" className="text-[var(--paragraph-text)] hover:text-[var(--color-primary)] text-sm">
                                    Book Appointment
                                </Link>
                            </li>
                            <li>
                                <Link href="/doctors" className="text-[var(--paragraph-text)] hover:text-[var(--color-primary)] text-sm">
                                    Our Doctors
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-[var(--heading-text)] mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            <li className="text-[var(--paragraph-text)] text-sm">General Medicine</li>
                            <li className="text-[var(--paragraph-text)] text-sm">Pediatrics</li>
                            <li className="text-[var(--paragraph-text)] text-sm">Cardiology</li>
                            <li className="text-[var(--paragraph-text)] text-sm">Orthopedics</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-[var(--heading-text)] mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="text-[var(--paragraph-text)] text-sm">
                                <span className="font-medium">Email:</span> contact@medico.com
                            </li>
                            <li className="text-[var(--paragraph-text)] text-sm">
                                <span className="font-medium">Phone:</span> (555) 123-4567
                            </li>
                            <li className="text-[var(--paragraph-text)] text-sm">
                                <span className="font-medium">Address:</span> 123 Medical Center Drive
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[var(--color-border)] mt-8 pt-6">
                    <p className="text-center text-[var(--color-muted-text)] text-sm">
                        © {currentYear} Medico. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
