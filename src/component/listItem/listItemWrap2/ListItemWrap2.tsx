import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './ListItemWrap2.module.less';
interface IListItemWrap2Props extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
/**
 * ListItemWrap2
 */
function ListItemWrap2(props: IListItemWrap2Props) {
  const { children, selected, className, onClick, ...otherProps } = props;
  const style: CSSProperties = {};
  if (onClick) {
    style.cursor = 'pointer';
  }
  return (
    <div
      {...otherProps}
      style={{ ...style, ...props.style }}
      onClick={onClick}
      className={classNames(
        styles.ListItemWrap2,
        selected && styles.ListItemWrap2Selected,
        className,
      )}
    >
      {children}
    </div>
  );
}
export default React.memo(ListItemWrap2);
