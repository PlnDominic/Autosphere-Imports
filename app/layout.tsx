import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Autosphere Imports - Driving the World to You',
  description:
    'Direct vehicle imports to Ghana with transparent DDP & CIF plans and clearance at Tema Port.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700&family=Merriweather+Sans:wght@400;500;700;800&family=Anonymous+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
