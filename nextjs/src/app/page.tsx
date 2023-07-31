'use client';
import Sidebar from '@/components/navbar';
import { useDarkMode } from '@/hooks/page';

export default function Home() {
  useDarkMode();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Sidebar />
      <div className='h-screen w-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-darker'>
        <h1>Title</h1>
      </div>
    </main>
  );
}
