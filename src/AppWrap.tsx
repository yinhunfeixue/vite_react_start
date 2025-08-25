import { useEffect, useState } from 'react';
import { APP_NAME, DEFAULT_LANGUAGE } from './config/ProjectConfig.ts';
import './fonts/iconfont.css';
import './index.less';
import Local from './preset/component/Local.tsx';

import App from './App.tsx';
import userProjectStore from './model/ProjectStore.ts';

import i18nData from '@/i18n/index.ts';

const AppWrap = () => {
  const language = userProjectStore((state) => state.language);
  const [locale, setLocale] = useState<string>(language || DEFAULT_LANGUAGE);

  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  return (
    <Local locale={locale} i18nData={i18nData} onChange={setLocale}>
      <App local={locale} />
    </Local>
  );
};

export default AppWrap;
