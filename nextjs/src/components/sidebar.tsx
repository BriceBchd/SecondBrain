'use client';

import { useDarkMode } from '@/hooks/useDarkMode';
import { useSidebar } from '@/hooks/useSidebar';
import { useAccount } from '@/hooks/useAccount';
import Authentication from './auth/auth';

const Sidebar = () => {
  const [showSidebar, toggleSidebar] = useSidebar();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [showAccount, toggleAccount] = useAccount();

  function handleToggleAccount() {
    toggleSidebar();
    toggleAccount();
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`
          fixed top-4 left-4
          flex items-center justify-center
          bg-white-100 hover:bg-gray-200 dark:hover:bg-darkHover 
          focus:outline-none rounded-md`}
      >
        <svg viewBox='0 0 24 24' className='w-8 m-1' strokeWidth='0'>
          <path d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z' />
        </svg>
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 mx-2 my-20 w-78 h-5/6 py-2 
        bg-gray-100 dark:bg-dark shadow-xl rounded-xl dark:border-darkText border-gray-300 border-2 transition-all duration-700  ${
          showSidebar ? 'translate-x-0' : '-translate-x-80'
        }`}
      >
        <nav className='flex flex-col m-4 mt-2'>
          <div className='flex items-center justify-between'>
            <button
              id='account'
              onClick={handleToggleAccount}
              className='flex items-center justify-center bg-white-100 hover:bg-gray-200 dark:hover:bg-darkHover focus:outline-none rounded-md'
            >
              <svg
                className='w-6 m-2'
                viewBox='0 0 24 24'
                fill='none'
                strokeWidth='1.5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
            </button>
            <button
              onClick={toggleSidebar}
              className='flex items-center justify-center bg-white-100 hover:bg-gray-200 dark:hover:bg-darkHover focus:outline-none rounded-md'
            >
              <svg
                className='w-6 m-2'
                viewBox='0 0 24 24'
                fill='none'
                strokeWidth='1.5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </button>
            <button
              onClick={toggleDarkMode}
              className='flex items-center justify-center bg-white-100 hover:bg-gray-200 dark:hover:bg-darkHover focus:outline-none rounded-md'
            >
              <svg
                className='w-6 m-2'
                viewBox='0 0 24 24'
                fill='none'
                strokeWidth='1.5'
              >
                <path
                  fillRule='evenodd'
                  d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <button
              onClick={toggleSidebar}
              className='flex items-center justify-center bg-white-100 hover:bg-gray-200 dark:hover:bg-darkHover focus:outline-none rounded-md'
            >
              <svg
                className='w-6 m-2'
                viewBox='0 0 24 24'
                fill='none'
                strokeWidth='1.5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
                />
              </svg>
            </button>
          </div>
          <div className='flex flex-col m-2'>
            <a href='#'>Link</a>
            <a href='#'>Link</a>
            <a href='#'>Link</a>
          </div>
        </nav>
      </aside>

      {showAccount && <Authentication toggleAccount={toggleAccount} />}
    </>
  );
};

export default Sidebar;
