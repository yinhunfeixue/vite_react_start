import fontjs from '@/fonts/iconfont.js?url';
import { createFromIconfontCN } from '@ant-design/icons';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import './IconFont.less';

interface IIconFontProps {
  className?: string;
  style?: CSSProperties;

  /**
   * 是否使用CSS图标, CSS图标的
   *
   * + 优点：可动态修改图标颜色
   * + 缺点：只能使用纯色
   */
  useCss?: boolean;

  type: string;

  disabled?: boolean;

  onClick?: React.MouseEventHandler;
}

const IconFontWrap = createFromIconfontCN({
  scriptUrl: fontjs,
});

/**
 * IconFont
 */
function IconFont(props: IIconFontProps) {
  const { className, style, type, useCss, disabled, onClick } = props;
  const effectStyle: CSSProperties = {
    ...style,
    cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'unset',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  };

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };
  if (useCss) {
    const char = String.fromCharCode(parseInt(type, 16));
    return (
      <span
        style={effectStyle}
        className={classNames('IconFont', className, { disabled })}
        onClick={handleClick}
      >
        {char}
      </span>
    );
  }
  return (
    <IconFontWrap
      style={effectStyle}
      className={classNames(className, { disabled })}
      type={type}
      onClick={handleClick}
    />
  );
}
export default IconFont;
