import LinkButton from '@/component/linkButton/LinkButton';
import AutoTip from '@/component/normal/autoTip/AutoTip';
import IconFont from '@/preset/component/IconFont';
import { Dropdown, Spin, Tag, TooltipProps } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import React, { CSSProperties, ReactNode, useMemo } from 'react';
import IListItemProps from '../IListItemProps';
import './ItemL1.less';

export type IItem1MenuItem = MenuItemType & {
  /**
   * 平铺到外层(默认在下拉菜单中)
   *
   * @default false
   */
  flatToOut?: boolean;
};
interface IItemL1Props extends IListItemProps {
  title?: {
    icon?: ReactNode;
    text: ReactNode;
    tooltip?: ReactNode;
    maxLine?: number;
    extra?: ReactNode;
    tipProps?: TooltipProps;
  };
  /**
   * 副标题
   */
  subTitle?: ReactNode;
  contents?: { icon?: ReactNode; text: ReactNode }[];
  tags?: { children: ReactNode; color?: string; style?: CSSProperties }[];

  /**
   * 渲染标签区的函数，此属性优先级高于tags，此属性有值，则 tags 无效
   * @returns
   */
  renderTag?: () => ReactNode;

  /**
   * 右下角的菜单列表
   */
  menus?: IItem1MenuItem[];

  /**
   * 仅在 hover 时显示菜单
   */
  showMenuWhenHover?: boolean;

  /**
   * 页脚
   */
  footer?: ReactNode;

  /**
   * 是否正在加载中
   */
  loading?: boolean;

  headerStyle?: CSSProperties;
}
/**
 * 大块列表项
 *
 * ![demo.png](demo.png)
 */
const ItemL1: React.FC<IItemL1Props> = (props) => {
  const {
    className,
    style,
    title,
    subTitle,
    contents,
    tags,
    menus,
    footer,
    renderTag,
    loading = false,
    headerStyle,
    showMenuWhenHover,
  } = props;

  const hasFooterContent = Boolean(
    (menus && menus.length) || (tags && tags.length) || Boolean(renderTag),
  );

  const outMenus = useMemo(() => {
    return menus?.filter((item) => item.flatToOut);
  }, [menus]);

  const innerMenus = useMemo(() => {
    return menus?.filter((item) => !item.flatToOut);
  }, [menus]);

  const renderTagFunc = () => {
    if (renderTag) {
      return renderTag();
    } else if (tags && tags.length) {
      return tags.map((item, index) => {
        const { children, color, style } = item;
        return (
          <Tag key={index} color={color} style={style}>
            {children}
          </Tag>
        );
      });
    }
    return null;
  };
  return (
    <div className={classNames('ItemL1', className)} style={style}>
      <header
        style={{
          marginBottom: (contents?.length || 0) > 1 ? 16 : 4,
          ...headerStyle,
        }}
      >
        {title && (
          <div className='ItemL1_Title'>
            {title.icon}
            <AutoTip
              toolTipProps={title.tipProps}
              content={title.text}
              maxLine={title.maxLine}
              title={title.tooltip}
            />
            {title.extra}
          </div>
        )}
        {subTitle && (
          <div className='ItemL1_SubTitle'>
            <AutoTip content={subTitle} />
          </div>
        )}
      </header>
      {/* 内容区 */}
      {contents && (
        <main>
          {contents.map((item, index) => {
            const { icon, text } = item;
            return (
              <div key={index} className='ContentItem'>
                {icon && (
                  <div className='ContentItemIcon'>
                    {icon && typeof icon === 'string' ? (
                      <IconFont type={icon} />
                    ) : (
                      icon
                    )}
                  </div>
                )}
                <AutoTip content={text} />
              </div>
            );
          })}
        </main>
      )}
      {footer}
      {/* 页脚 */}
      {hasFooterContent && (
        <footer>
          <div className='FooterContent'>{renderTagFunc()}</div>
          {/* 菜单 */}
          <div className='HControlGroup'>
            {outMenus?.map((item: IItem1MenuItem) => {
              return (
                <LinkButton
                  key={item.key}
                  style={{ color: 'rgba(91, 127, 163, 1)' }}
                  onClick={(event) => {
                    event.stopPropagation();
                    item.onClick?.({} as any);
                  }}
                >
                  {item.label}
                </LinkButton>
              );
            })}
            {Boolean(innerMenus?.length) && (
              <Dropdown
                menu={{
                  items: innerMenus,
                  onClick: (info) => {
                    info.domEvent.stopPropagation();
                  },
                  style: { minWidth: 120 },
                }}
              >
                <Spin spinning={loading}>
                  <IconFont
                    onClick={(event) => event.stopPropagation()}
                    type='icon-more'
                    className={classNames(
                      'IconButton',
                      'ItemL1_MenuIcon',
                      showMenuWhenHover && 'ItemL1_MenuIcon_WhenHover',
                    )}
                  />
                </Spin>
              </Dropdown>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};
export default ItemL1;
