'use client';

import { useState } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className='fixed top-4 left-4 z-10 flex items-center justify-center bg-white-100 hover:bg-gray-200 focus:outline-none rounded-md'
      >
        <svg className='w-8 text-black m-1' viewBox='0 0 24 24'>
          <path
            fillRule='evenodd'
            d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {showSidebar && (
        <aside className='fixed top-0 left-0 py-12 w-52 h-screen bg-gray-100 shadow-xl border-r-2'>
          <nav className='flex flex-col m-4 mt-2'>
            <div className='flex items-center justify-start'>
              <button
                onClick={toggleSidebar}
                className='flex items-center justify-center bg-white-100 hover:bg-gray-200 focus:outline-none'
              >
                <svg
                  className='w-6 m-2 text-black rounded-md'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke-width='1.5'
                  stroke='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                    clipRule='evenodd'
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
      )}
    </>
  );
};

export default Sidebar;
