import { useState } from 'react';

export const useAuthForm = () => {
  const [authFormType, setAuthFormType] = useState<'login' | 'signup'>('login');

  const toggleAuthForm = () => {
    setAuthFormType(authFormType === 'login' ? 'signup' : 'login');
  };

  return [authFormType, toggleAuthForm] as const;
};
