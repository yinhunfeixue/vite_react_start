import IRouteItem from '@/preset/config/IRouteItem';
import LocalUtil from '@/preset/tools/LocalUtil';
import UrlUtil from '@/utils/UrlUtil';
import { ItemType } from 'antd/es/menu/interface';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * 布局工具类
 * 提供菜单项生成、路由转换等布局相关的工具方法
 */
class LayoutUtil {
  /**
   * 根据路由配置创建 Antd 菜单项
   * @param data - 路由配置数组
   * @param renderTitle - 自定义标题渲染函数，可选
   * @returns Antd 菜单项数组
   * @example
   * ```tsx
   * const menuItems = LayoutUtil.createMenuItems(routes);
   * ```
   */
  static createMenuItems(
    data: IRouteItem[],
    renderTitle?: (item: IRouteItem) => ReactNode
  ): ItemType[] {
    const renderMenuTitle = (item: IRouteItem): ReactNode => {
      if (renderTitle) {
        return renderTitle(item);
      }
      const href = item.href || item.path;
      return (
        <Link to={UrlUtil.getUrl(href)}>
          {LocalUtil.formatMessage({ id: item.title })}
        </Link>
      );
    };

    return data
      .filter((item) => {
        return !(item.menuHidden || item.redirect);
      })
      .map((item) => {
        if (item.children?.length) {
          return {
            key: item.path,
            label: item.title,
            icon: item.icon,
            children: this.createMenuItems(item.children, renderTitle),
          };
        } else {
          return {
            key: item.path,
            icon: item.icon,
            label: renderMenuTitle(item),
          };
        }
      });
  }
}
export default LayoutUtil;
