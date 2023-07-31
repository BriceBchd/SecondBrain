'use client';
import { useEffect } from 'react';

export const useDarkMode = () => {
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    const htmlElement = document.querySelector('html');
    if (darkMode === 'false' && htmlElement) {
      htmlElement.classList.toggle('dark');
    } else {
      localStorage.setItem('darkMode', 'true');
    }
  }, []);
};
