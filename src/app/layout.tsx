import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PaywallProvider } from '@/context/PaywallContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#060c18',
};

export const metadata: Metadata = {
  title: 'Yachad - Holy Tales for Jewish Kids | יחד - סיפורי צדיקים לילדים',
  description: 'Bilingual video storytelling and activity platform for Jewish kids.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PaywallProvider>
          {children}
        </PaywallProvider>
      </body>
    </html>
  );
}
