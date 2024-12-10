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
  };

  if (useCss) {
    const char = unescape(`%u${type}`);
    return (
      <span
        style={effectStyle}
        className={classNames('IconFont', className)}
        onClick={disabled ? undefined : onClick}
      >
        {char}
      </span>
    );
  }
  return <IconFontWrap style={effectStyle} type={type} disabled={disabled} />;
}
export default IconFont;
