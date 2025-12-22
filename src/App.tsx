/**
 * 应用根组件
 */
import { DEFAULT_LANGUAGE } from '@/config/ProjectConfig';
import { routeConfig } from '@/config/RouteConfig';
import RouterRender from '@/preset/component/RouterRender';
import { ConfigProvider, message } from 'antd';
import antdEN from 'antd/lib/locale/en_US';
import antdZH from 'antd/lib/locale/zh_CN';

import { Locale } from 'antd/es/locale';

import 'dayjs/locale/zh-cn';
import { useEffect } from 'react';
import { AntdMessageUtil } from './utils/AntdMessage';

interface AppProps {
  local: string;
}

const antdLocaleMap: {
  [key: string]: Locale;
} = {
  'zh-CN': antdZH,
  en: antdEN,
};

function App(props: AppProps) {
  const { local } = props;
  const localSetting = antdLocaleMap[local] || antdLocaleMap[DEFAULT_LANGUAGE];
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    AntdMessageUtil.instance = messageApi;
  }, [messageApi]);

  return (
    <ConfigProvider locale={localSetting} theme={{ cssVar: {} }}>
      <RouterRender routeConfig={routeConfig} />
      {contextHolder}
    </ConfigProvider>
  );
}

export default App;
