import { LeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import LinkButton from '../linkButton/LinkButton';
import styles from './PageSmallHeader.module.less';
interface IPageSmallHeaderProps {
  className?: string;
  style?: CSSProperties;

  /**
   *   标题
   */
  title?: React.ReactNode;

  /**
   * 禁用返回
   *
   * @default false
   */
  disableBack?: boolean;

  /**
   * 扩展内容
   */
  extra?: React.ReactNode;
}
/**
 * PageSmallHeader
 */
function PageSmallHeader(props: IPageSmallHeaderProps) {
  const { className, style, title, disableBack, extra } = props;
  return (
    <div
      className={classNames(styles.PageSmallHeader, className)}
      style={style}
    >
      <Space>
        {!disableBack && (
          <LinkButton type='text' onClick={() => window.history.back()}>
            <LeftOutlined />
          </LinkButton>
        )}
        <h5>{title}</h5>
      </Space>
      {extra && <div className={styles.Extra}>{extra}</div>}
    </div>
  );
}
export default React.memo(PageSmallHeader);
