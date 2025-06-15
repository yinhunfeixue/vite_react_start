import IconFont from '@/preset/component/IconFont';
import React, { ReactNode } from 'react';
interface IIconLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标
   *
   * string - 字体图标
   * ReactNode - React 元素
   */
  icon?: string | ReactNode;

  /**
   * 图标大小
   *
   * icon 为字体图标时有效
   * @default 16
   */
  iconSize?: number;

  /**
   * 标签文本
   */
  label?: string;
}
/**
 * IconLabel
 */
function IconLabel(props: IIconLabelProps) {
  const { icon, label, className, iconSize = 16, style, ...otherProps } = props;

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <IconFont type={icon} style={{ fontSize: iconSize }} />;
    }
    return icon;
  };
  return (
    <div {...otherProps} className='HGroup'>
      {renderIcon()}
      <span>{label}</span>
    </div>
  );
}
export default React.memo(IconLabel);
