import Sidebar from '@/components/navbar';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 dark:bg-darker dark:text-darkText dark:fill-darkText stroke-dark dark:stroke-darkText'>
      <Sidebar />
    </main>
  );
}
