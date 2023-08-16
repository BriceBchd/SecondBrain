import Login from './login';
import Register from './register';
import Profile from './profile';
import { useAuthForm } from '../../hooks/auth/useAuthForm';
import { useEffect } from 'react';

type AuthenticationProps = {
  toggleAccount: () => void;
};

const Authentication = ({ toggleAccount }: AuthenticationProps) => {
  const [authFormType, toggleAuthForm] = useAuthForm();

  useEffect(() => {
    if (authFormType === 'loading') {
      const token = document.cookie.split('=')[1];
      if (token) {
        toggleAuthForm('profile');
      } else {
        toggleAuthForm('login');
      }
    }
  }, [authFormType, toggleAuthForm]);

  return (
    <div className='mx-auto my-20 py-10 sm:w-3/4 md:w-3/4 max-w-xl h-5/6 fixed inset-0 flex items-center z-10'>
      <div
        className={`flex items-center m-10 w-full h-full shadow-xl rounded-xl
      bg-gray-100 border-gray-300 border-2
      dark:border-darkText dark:bg-dark
      `}
      >
        <button
          className='absolute top-0 right-0 p-2 m-12'
          onClick={toggleAccount}
        >
          <svg
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.2}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        {authFormType === 'loading' ? (
          <div></div>
        ) : authFormType === 'login' ? (
          <Login toggleAuthForm={(authForm) => toggleAuthForm(authForm)} />
        ) : authFormType === 'register' ? (
          <Register toggleAuthForm={(authForm) => toggleAuthForm(authForm)} />
        ) : (
          <Profile toggleAuthForm={(authForm) => toggleAuthForm(authForm)} />
        )}
      </div>
    </div>
  );
};

export default Authentication;
