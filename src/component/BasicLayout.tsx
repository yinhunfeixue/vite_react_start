import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './BasicLayout.module.less';
interface IBasicLayoutProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * BasicLayout
 */
function BasicLayout(props: IBasicLayoutProps) {
  const { className, style } = props;
  return (
    <div className={classNames(styles.BasicLayout, className)} style={style}>
      <Outlet />
    </div>
  );
}
export default React.memo(BasicLayout);
