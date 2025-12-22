import { MENU_LIST } from '@/config/RouteConfig';
import LayoutUtil from '@/utils/LayoutUtil';
import { Menu } from 'antd';
import React, { CSSProperties, Key, useState } from 'react';
interface IProjectMenuProps {
  className?: string;
  style?: CSSProperties;

  defaultOpenKeys?: Key[];
  defaultSelectedKeys?: Key[];
}
/**
 * ProjectMenu
 */
function ProjectMenu(props: IProjectMenuProps) {
  const { className, style, defaultOpenKeys, defaultSelectedKeys } = props;
  const [openMenuKeys, setOpenMenuKeys] = useState<Key[] | undefined>(
    defaultOpenKeys,
  );
  const [selectedMenuKeys, setSelectedMenuKeys] = useState<Key[] | undefined>(
    defaultSelectedKeys,
  );

  const createMenuItems = () => {
    return LayoutUtil.createMenuItems(MENU_LIST);
  };

  return (
    <Menu
      className={className}
      style={style}
      theme='dark'
      mode='inline'
      items={createMenuItems()}
      openKeys={openMenuKeys as string[]}
      selectedKeys={selectedMenuKeys as string[]}
      onOpenChange={(keys) => {
        setOpenMenuKeys(keys);
      }}
      onSelect={(option) => {
        setSelectedMenuKeys(option.selectedKeys);
      }}
    />
  );
}
export default React.memo(ProjectMenu);
