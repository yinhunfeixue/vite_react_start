import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import styles from './ContentLayoutHeader.module.less';

export interface IContentLayoutHeaderProps {
  className?: string;
  style?: CSSProperties;

  /**
   *  标题
   */
  title?: ReactNode;

  /**
   *  右侧扩展内容
   */
  extra?: ReactNode;
}
/**
 * ContentLayoutHeader
 */
function ContentLayoutHeader(props: IContentLayoutHeaderProps) {
  const { className, style, title, extra } = props;
  return (
    <div
      className={classNames(styles.ContentLayoutHeader, className)}
      style={style}
    >
      <h3>{title}</h3>
      <div>{extra}</div>
    </div>
  );
}
export default React.memo(ContentLayoutHeader);
