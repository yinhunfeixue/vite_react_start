import { ReactElement, ReactNode } from 'react';

export default interface IRouteItem {
  /**
   * 菜单名称
   */
  title?: string;
  /**
   * route路径
   */
  path: string;

  /**
   * route组件
   */
  component?: ReactElement | Function;

  /**
   * 子结点列表
   */
  children?: IRouteItem[];

  /**
   * 是否在菜单中隐藏
   *
   * @default false
   */
  hideInMenu?: Boolean;

  /**
   * 点击菜单跳转的路径，如果不设置，则使用path
   */
  href?: string;

  /**
   * 重定向的路径
   */
  redirect?: string;

  /**
   * 图标
   */
  icon?: ReactNode;
}
