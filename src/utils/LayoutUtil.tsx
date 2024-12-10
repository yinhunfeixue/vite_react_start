import IRouteItem from '@/preset/config/IRouteItem';
import LocalUtil from '@/preset/tools/LocalUtil';
import UrlUtil from '@/utils/UrlUtil';
import { ItemType } from 'antd/es/menu/interface';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * LayoutUtil
 */
class LayoutUtil {
  static createMenuItems(
    data: IRouteItem[],
    renderTitle?: (item: IRouteItem) => ReactNode
  ): ItemType[] {
    const titleFun = (item: IRouteItem) => {
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
        return !(item.hideInMenu || item.redirect);
      })
      .map((item) => {
        if (item.children && item.children.length) {
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
            label: titleFun(item),
          };
        }
      });
  }
}
export default LayoutUtil;
