import { ComponentType, ReactNode } from 'react';

/**
 * 路由配置项接口
 * 用于定义应用的路由结构，包括页面路径、组件、菜单显示等配置
 */
export default interface IRouteItem {
  /**
   * 菜单名称/页面标题
   * 支持国际化 key，会自动通过 LocaleUtil 进行翻译
   * @example 'userList' | 'functionExample'
   */
  title?: string;

  /**
   * 路由路径
   * 支持动态路由参数和通配符路由
   * @example '/login' | '/user/:id' | '*'
   */
  path: string;

  /**
   * 路由对应的组件
   * 建议使用 loadable 进行懒加载以优化性能
   * 如果是重定向路由，可以不设置此属性
   * @example loadable(() => import('@/pages/Login'))
   */
  component?: ComponentType;

  /**
   * 子路由列表
   * 支持无限层级嵌套，父级路由通常作为布局组件
   * @example children: [{ path: '/user/list', component: UserList }]
   */
  children?: IRouteItem[];

  /**
   * 是否在菜单中隐藏
   *
   * @default false
   */
  menuHidden?: boolean;

  /**
   * 菜单点击时跳转的路径
   * 如果不设置，默认使用 path 属性
   * 适用于菜单项需要跳转到与 path 不同的地址
   * @example '/external-link' | '/user/profile'
   */
  href?: string;

  /**
   * 重定向目标路径
   * 设置后访问当前 path 会自动重定向到此路径
   * 常用于默认页面重定向，如 '/' 重定向到 '/index'
   * @example '/index' | '/dashboard'
   */
  redirect?: string;

  /**
   * 菜单图标
   * 支持 React 组件，通常使用 antd 的图标组件
   * 只在菜单显示时生效
   * @example <UserOutlined /> | <BookOutlined />
   */
  icon?: ReactNode;
}
