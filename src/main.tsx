/**
 * 应用程序入口文件
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fonts/iconfont.css';
import './index.less';

import AppWrap from './AppWrap.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrap />
  </StrictMode>,
);
