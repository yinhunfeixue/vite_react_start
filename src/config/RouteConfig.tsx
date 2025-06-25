import IRouteItem from '@/preset/config/IRouteItem';
import loadable from '@loadable/component';

const routeConfig: IRouteItem[] = [
  {
    title: '登录',
    path: '/Login',
    component: loadable(() => import('@/pages/Login')),
    menuHidden: true,
  },
  {
    title: '主页',
    path: '/',
    component: loadable(() => import('@/component/BasicLayout')),
    children: [
      {
        path: '/',
        redirect: '/extraction/list',
      },
      {
        path: '/extraction',
        children: [
          {
            path: '/extraction/list',
            component: loadable(
              () => import('@/pages/extractionTask/ExtractionListPage'),
            ),
          },
          {
            path: '/extraction/fileManage',
            component: loadable(
              () => import('@/pages/extractionTask/ExtractionFilePage'),
            ),
          },
          {
            path: '/extraction/detail',
            component: loadable(
              () => import('@/pages/extractionTask/ExtractionDetailPage'),
            ),
          },
          {
            path: '/extraction/document-renderer',
            component: loadable(
              () =>
                import('@/component/documentRenderer/DocumentRendererExample'),
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: loadable(() => import('@/pages/Page404')),
  },
];

const MENU_LIST: IRouteItem[] =
  routeConfig.find((item) => item.path === '/')?.children || [];

export { MENU_LIST, routeConfig };
