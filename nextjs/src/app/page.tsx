'use client';
import Sidebar from '@/components/navbar';
import HomePage from '@/components/homepage';
import { useDarkMode } from '@/hooks/page';

export default function Home() {
  useDarkMode();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Sidebar />
      <HomePage />
    </main>
  );
}
