import { useCallback, useEffect, useState } from 'react';

/**
 * useTheme - 主题切换 Hook
 * 管理应用主题状态，动态加载对应的主题 CSS 文件
 * @param defaultTheme 默认主题名称
 * @returns [当前主题, 设置主题函数]
 */
function useTheme(
  defaultTheme?: string
): [string | undefined, (theme: string) => void] {
  const [theme, setTheme] = useState<string | undefined>(defaultTheme);

  /**
   * 加载主题样式
   * 动态创建或更新主题样式链接元素
   */
  const loadTheme = useCallback(() => {
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
  }, [theme]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return [theme, setTheme];
}
export default useTheme;
