import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import styles from './ContentLayout.module.less';
import ContentLayoutHeader, {
  IContentLayoutHeaderProps,
} from './ContentLayoutHeader';

interface IContentLayoutProps {
  className?: string;
  style?: CSSProperties;

  /**
   *  页面头部配置
   */
  header?: IContentLayoutHeaderProps;

  children?: ReactNode;

  /**
   *  页面底部内容
   */
  footer?: ReactNode;
}
/**
 * ContentLayout
 */
function ContentLayout(props: IContentLayoutProps) {
  const { className, style, header, children, footer } = props;
  return (
    <div className={classNames(styles.ContentLayout, className)} style={style}>
      {header && <ContentLayoutHeader {...header} />}
      <div className={styles.Content}>{children}</div>
      {footer && <footer className={styles.PageFooter}>{footer}</footer>}
    </div>
  );
}
export default React.memo(ContentLayout);
