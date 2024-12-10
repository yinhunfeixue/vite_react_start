import { DEFAULT_LANGUAGE } from '@/config/ProjectConfig';
import { routeConfig } from '@/config/RouteConfig';
import RouterRender from '@/preset/component/RouterRender';
import { ConfigProvider } from 'antd';
import antdEN from 'antd/lib/locale/en_US';
import antdZH from 'antd/lib/locale/zh_CN';

import { Locale } from 'antd/es/locale';

const antdLocalDic: {
  [key: string]: Locale;
} = {
  'zh-CN': antdZH,
  en: antdEN,
};

function App(props: { local: string }) {
  const { local } = props;
  const localSetting = antdLocalDic[local] || antdLocalDic[DEFAULT_LANGUAGE];

  return (
    <ConfigProvider locale={localSetting}>
      <RouterRender routeConfig={routeConfig} />
    </ConfigProvider>
  );
}

export default App;
