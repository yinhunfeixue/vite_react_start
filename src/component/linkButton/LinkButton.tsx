import { Spin } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import styles from './LinkButton.module.less';
interface ILinkButtonProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler;

  type?: 'text' | 'link';
  loading?: boolean;
}
/**
 * LinkButton
 */
const LinkButton: React.FC<ILinkButtonProps> = (props) => {
  const {
    className,
    style,
    children,
    disabled,
    onClick,
    type = 'link',
    loading = false,
    ...otherProps
  } = props;

  let typeClassName = '';
  if (type === 'text') {
    typeClassName = styles.LinkButtonText;
  }
  return (
    <a
      {...otherProps}
      className={classNames(
        styles.LinkButton,
        typeClassName,
        disabled && styles.LinkButtonDisabled,
        className,
      )}
      style={style}
      onClick={(event) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      }}
    >
      <Spin spinning={loading} size='small'>
        {children}
      </Spin>
    </a>
  );
};
export default LinkButton;
