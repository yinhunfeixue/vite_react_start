import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { APP_NAME, DEFAULT_LANGUAGE } from './config/ProjectConfig.ts';
import './fonts/iconfont.css';
import './index.less';
import Local from './preset/component/Local.tsx';

import App from './App.tsx';
import userProjectStore from './model/ProjectStore.ts';

import i18nData from '@/i18n/index.ts';
import { StyleProvider } from '@ant-design/cssinjs';
import AxiosInit from './api/AxiosInit.ts';
import ProjectStoreInit from './model/ProjectStoreInit.ts';

AxiosInit.init();
const AppWrap = () => {
  const language = userProjectStore((state) => state.language);
  const [locale, setLocal] = useState<string>(language || DEFAULT_LANGUAGE);
  const localData = i18nData[locale];

  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  return (
    <Local
      defaultLocal={DEFAULT_LANGUAGE}
      messages={localData}
      onChange={(value) => setLocal(value)}
    >
      <App local={locale} />
    </Local>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectStoreInit />
    <StyleProvider hashPriority="low">
      <AppWrap />
    </StyleProvider>
  </StrictMode>
);
