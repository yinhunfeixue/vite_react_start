import { Outlet } from 'react-router-dom';
import styles from './BasicLayout.module.less';

/**
 * BasicLayout - 基础布局组件
 * 提供应用的主要布局结构，包括侧边菜单、顶部导航栏和主内容区域
 * 负责用户认证状态管理、主题切换、语言切换等全局功能
 */
function BasicLayout() {
  return (
    <div className={styles.BasicLayout}>
      <Outlet />
    </div>
  );
}
export default BasicLayout;
