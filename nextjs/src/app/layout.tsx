import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Second Brain',
  description: 'A Second Brain for the Digital Age',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='dark' lang='en'>
      <body
        className={`${inter.className} text-darker dark:bg-darker dark:text-darkText dark:fill-darkText stroke-dark dark:stroke-darkText`}
      >
        {children}
      </body>
    </html>
  );
}
