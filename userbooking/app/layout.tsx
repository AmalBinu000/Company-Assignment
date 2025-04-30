import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { ClerkProvider } from '@clerk/nextjs';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen flex flex-col bg-[var(--color-bg)]">
                <ClerkProvider>
                    <ThemeProvider>
                        <AppointmentProvider>
                            <Header />
                            <main className="flex-grow container mx-auto px-4 py-8">
                                {children}
                            </main>
                            <Footer />
                        </AppointmentProvider>
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
} 