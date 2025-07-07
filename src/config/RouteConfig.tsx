import IRouteItem from '@/preset/config/IRouteItem';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import loadable from '@loadable/component';

const routeConfig: IRouteItem[] = [
  {
    title: '登录',
    path: 'login',
    component: loadable(() => import('@/pages/Login')),
    menuHidden: true,
  },
  {
    title: '主页',
    path: '',
    component: loadable(() => import('@/component/BasicLayout')),
    children: [
      {
        path: '',
        icon: <BookOutlined />,
        title: 'functionExample',
        component: loadable(() => import('@/pages/index/IndexPage')),
      },
      {
        path: 'userList',
        title: 'userList',
        icon: <UserOutlined />,
        component: loadable(() => import('@/pages/user/UserListPage')),
      },
    ],
  },
  {
    path: '*',
    component: loadable(() => import('@/pages/Page404')),
  },
];

const MENU_LIST: IRouteItem[] =
  routeConfig.find((item) => item.path === '')?.children || [];

export { MENU_LIST, routeConfig };
