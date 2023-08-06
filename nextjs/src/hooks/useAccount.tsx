import { useState } from 'react';

export const useAccount = () => {
  const [showAccount, setShowAccount] = useState(false);

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  return [showAccount, toggleAccount] as const;
};
