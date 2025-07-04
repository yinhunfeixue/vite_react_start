import {
  BugOutlined,
  CodeOutlined,
  DesktopOutlined,
  FileTextOutlined,
  FireOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Menu, Typography } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useState } from 'react';
import styles from './SideMenu.module.less';

const { Title } = Typography;

interface ISideMenuProps {
  className?: string;
  style?: CSSProperties;
  onMenuClick?: (key: string) => void;
}

interface DeviceItem {
  key: string;
  name: string;
  children: Array<{
    key: string;
    name: string;
    icon: React.ReactNode;
  }>;
}

/**
 * SideMenu - 左侧菜单组件
 */
function SideMenu(props: ISideMenuProps) {
  const { className, style, onMenuClick } = props;
  const [selectedKey, setSelectedKey] = useState('new-project');

  // 模拟设备数据
  const devices: DeviceItem[] = [
    {
      key: 'device-1',
      name: '设备1',
      children: [
        { key: 'device-1-burn', name: '烧录', icon: <FireOutlined /> },
        { key: 'device-1-debug', name: '调试', icon: <BugOutlined /> },
        { key: 'device-1-log', name: '日志', icon: <FileTextOutlined /> },
        { key: 'device-1-stack', name: '栈分析', icon: <CodeOutlined /> },
      ],
    },
    {
      key: 'device-2',
      name: '设备2',
      children: [
        { key: 'device-2-burn', name: '烧录', icon: <FireOutlined /> },
        { key: 'device-2-debug', name: '调试', icon: <BugOutlined /> },
        { key: 'device-2-log', name: '日志', icon: <FileTextOutlined /> },
        { key: 'device-2-stack', name: '栈分析', icon: <CodeOutlined /> },
      ],
    },
  ];

  const menuItems = [
    {
      key: 'basic',
      label: '基本功能',
      type: 'group' as const,
      children: [
        {
          key: 'new-project',
          label: '新建项目',
          icon: <PlusOutlined />,
        },
        {
          key: 'help',
          label: '帮助',
          icon: <QuestionCircleOutlined />,
        },
        {
          key: 'forum',
          label: '论坛',
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      key: 'devices',
      label: (
        <div className={styles.deviceGroupTitle}>
          <span>设备列表</span>
          <PlusCircleOutlined
            className={styles.addDeviceIcon}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedKey('connect-device');
              onMenuClick?.('connect-device');
            }}
            title='连接设备'
          />
        </div>
      ),
      type: 'group' as const,
      children: devices.map((device) => ({
        key: device.key,
        label: device.name,
        icon: <DesktopOutlined />,
        children: device.children.map((child) => ({
          key: child.key,
          label: child.name,
          icon: child.icon,
        })),
      })),
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    onMenuClick?.(e.key);
  };

  return (
    <div className={classNames(styles.SideMenu, className)} style={style}>
      <div className={styles.menuHeader}>
        <Title level={4} className={styles.title}>
          <ToolOutlined /> 项目管理
        </Title>
      </div>
      <div className={styles.menuContent}>
        <Menu
          mode='inline'
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
          className={styles.menu}
        />
      </div>
    </div>
  );
}

export default React.memo(SideMenu);
