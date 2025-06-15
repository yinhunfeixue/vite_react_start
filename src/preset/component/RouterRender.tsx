import IRouteItem from '@/preset/config/IRouteItem';
import { ReactElement } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigateInit from './NavigateInit';

/**
 * 路由配置文件
 */
function RouterRender(props: { routeConfig: IRouteItem[] }) {
  const { routeConfig, ...otherProps } = props;

  const renderRoutes = (data?: IRouteItem[]): ReactElement[] => {
    if (!data) {
      return [];
    }
    //按是否有redirect排序，有redirect的在后面
    data.sort((a, b) => {
      if (a.redirect && !b.redirect) {
        return 1;
      } else if (!a.redirect && b.redirect) {
        return -1;
      }
      return 0;
    });
    let result: ReactElement[] = data.map((item, index) => {
      const createElement = (props: any) => {
        if (item.redirect) {
          return <Navigate key={index} to={item.redirect} />;
        }
        let ClassType = item.component;
        if (ClassType) {
          return <ClassType {...props} />;
        }
        return null;
      };
      console.log('item', item);

      return (
        <Route
          key={item.path}
          path={item.path}
          element={createElement(otherProps)}
        >
          {renderRoutes(item.children)}
        </Route>
      );
    });
    return result;
  };

  const result = (
    <HashRouter>
      <NavigateInit />
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </HashRouter>
  );
  return result;
}

export default RouterRender;
