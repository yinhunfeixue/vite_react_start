import IconFont from '@/preset/component/IconFont';
import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import IListItemProps from './IListItemProps';
import './ListItemWrap.less';
interface IListItemWrapProps extends IListItemProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;

  /**
   * 是否禁用选中图标（右上角）
   */
  disabledSelectedIcon?: boolean;

  type?: 'error';
}
/**
 * ListItemWrap
 */
const ListItemWrap: React.FC<IListItemWrapProps> = (props) => {
  const {
    className,
    style,
    children,
    selected,
    disabled,
    disabledSelectedIcon,
    type,
    onClick,
    ...otherProps
  } = props;

  const getClassName = (): string[] => {
    const result: string[] = [];
    if (type) {
      result.push(`ListItemWrap${type}`);
    }
    if (selected) {
      result.push(`ListItemWrapSelected`);
    }
    if (disabled) {
      result.push(`ListItemWrapDisabled`);
    }
    return result;
  };

  const autoStyle: CSSProperties = {};

  if (disabled) {
    autoStyle.cursor = `not-allowed`;
  } else if (onClick) {
    autoStyle.cursor = `pointer`;
  }

  return (
    <div
      {...otherProps}
      className={classNames('ListItemWrap', ...getClassName(), className)}
      style={{ ...autoStyle, ...style }}
      onClick={(event) => {
        if (event.currentTarget.contains(event.target as Node)) {
          if (onClick && !disabled) {
            onClick(event);
          }
        }
      }}
    >
      {children}
      {selected && !disabledSelectedIcon && (
        <IconFont
          type='icon-icon_tag_top'
          className='ListItemWrapIconChecked'
        />
      )}
    </div>
  );
};
export default ListItemWrap;
