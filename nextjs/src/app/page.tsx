import Sidebar from '@/components/sidebar';
import HomePage from '@/components/homepage';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Sidebar />
      <HomePage />
    </main>
  );
}
