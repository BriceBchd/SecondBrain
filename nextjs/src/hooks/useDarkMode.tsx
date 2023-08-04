import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      setIsDarkMode(htmlElement.classList.contains('dark'));
    }
  }, []);

  function toggleDarkMode() {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.toggle('dark');
      const isDarkMode = htmlElement.classList.contains('dark');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      setIsDarkMode(isDarkMode);
    }
  }

  return [isDarkMode, toggleDarkMode] as const;
}
