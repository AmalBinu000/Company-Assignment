import './globals.css';
import { AppointmentProvider } from './context/AppointmentContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { ClerkProvider } from '@clerk/nextjs'

const clerkAppearance = {
  baseTheme: 'light',
  elements: {
    formButtonPrimary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    card:
      "bg-white shadow-md rounded-lg",
    headerTitle:
      "text-gray-900 text-xl font-semibold",
    headerSubtitle:
      "text-gray-600",
    socialButtonsBlockButton:
      "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50",
    socialButtonsBlockButtonText:
      "text-gray-600",
    formField:
      "rounded-md",
    formFieldInput:
      "rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    footerActionLink:
      "text-blue-600 hover:text-blue-700",
    identityPreviewText:
      "text-gray-700",
    identityPreviewEditButton:
      "text-blue-600 hover:text-blue-700",
  },
  variables: {
    colorPrimary: '#2563eb',
    colorTextOnPrimaryBackground: '#ffffff',
    colorBackground: '#ffffff',
    colorText: '#111827',
    colorInputBackground: '#ffffff',
    colorInputText: '#111827',
    colorTextSecondary: '#4b5563',
    borderRadius: '0.375rem',
  }
};

export const metadata = {
  title: 'Doctor Appointment System',
  description: 'Book appointments with your favorite doctors',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={clerkAppearance} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-gray-50">
          <AppointmentProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </AppointmentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
