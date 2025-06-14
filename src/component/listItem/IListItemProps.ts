import React, { CSSProperties, DragEventHandler } from 'react';

/**
 * IListItemProps
 */
export default interface IListItemProps<T = any> {
  data?: T;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler;

  draggable?: boolean | undefined;
  onDrag?: DragEventHandler<T> | undefined;
  onDragStart?: DragEventHandler<T> | undefined;
  onDrop?: DragEventHandler<T> | undefined;
}
