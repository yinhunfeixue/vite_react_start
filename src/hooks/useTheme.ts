import { useEffect, useState } from 'react';

/**
 * useTheme
 */
function useTheme(
  defaultTheme?: string
): [string | undefined, (theme: string) => void] {
  const [theme, setTheme] = useState<string | undefined>(defaultTheme);
  useEffect(() => {
    loadTheme();
  }, [theme]);

  /**
   * 1. 如果无主题，则移除href
   * 2. 如果有主题，则设置 href
   * @returns
   */
  const loadTheme = () => {
    let themeElement = document.getElementById('theme-css') as HTMLLinkElement;
    if (!themeElement) {
      themeElement = document.createElement('link');
      themeElement.id = 'theme-css';
      themeElement.rel = 'stylesheet';
      document.head.appendChild(themeElement);
    }

    if (!theme) {
      themeElement.removeAttribute('href');
      themeElement.removeAttribute('data-theme');
    } else {
      themeElement.setAttribute('href', `/themes/${theme}.css`);
      themeElement.setAttribute('data-theme', theme);
    }
  };
  return [theme, setTheme];
}
export default useTheme;
