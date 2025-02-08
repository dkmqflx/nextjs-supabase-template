'use client';

import { useEffect, useState } from 'react';

import { Theme, ThemeProviderContext } from '@/shared/hooks/useTheme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 서버 사이드에서는 기본값 반환
    if (typeof window === 'undefined') return 'light';

    // localStorage에서 테마 가져오기
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedTheme) return savedTheme;

    // 시스템 설정 확인
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeProviderContext.Provider value={{ theme, setTheme }}>{children}</ThemeProviderContext.Provider>;
}
