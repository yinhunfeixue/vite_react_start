import IRouteItem from '@/preset/config/IRouteItem';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import loadable from '@loadable/component';

const routeConfig = [
  {
    title: '登录',
    path: '/Login',
    component: loadable(() => import('@/pages/Login')),
    hideInMenu: true,
  },
  {
    title: '主页',
    path: '/',
    component: loadable(() => import('@/component/BasicLayout')),
    children: [
      {
        path: '/',
        redirect: '/index',
      },
      {
        path: '/index',
        icon: <BookOutlined />,
        title: 'functionExample',
        component: loadable(() => import('@/pages/plaid/AddAccount')),
      },
      {
        path: '/userList',
        href: '/userList',
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
  routeConfig.find((item) => item.path === '/')?.children || [];

export { MENU_LIST, routeConfig };
