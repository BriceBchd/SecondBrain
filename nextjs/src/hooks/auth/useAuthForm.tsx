import { useState } from 'react';

type AuthFormType = 'profile' | 'login' | 'register' | 'loading';

export const useAuthForm = (): [AuthFormType, (formType: string) => void] => {
  const [authFormType, setAuthFormType] = useState<AuthFormType>('loading');

  const toggleAuthForm = (formType: string) => {
    switch (formType) {
      case 'loading':
      case 'profile':
      case 'login':
      case 'register':
        setAuthFormType(formType);
        break;
      default:
        console.error(`Invalid auth form type: ${formType}`);
    }
  };

  return [authFormType, toggleAuthForm];
};
