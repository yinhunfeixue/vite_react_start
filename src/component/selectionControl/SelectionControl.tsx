import classNames from 'classnames';
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './SelectionControl.less';

interface ISelectionControlProps {
  className?: string;
  style?: CSSProperties;

  /**
   * 渲染菜单
   * @param text 选中的文字
   * @param close 关闭菜单的函数
   */
  renderControls: (text: string, close: () => void) => React.ReactNode;

  children?: ReactNode;
}
/**
 * html 文档组件
 *
 * 支持选择文字后展示菜单
 */
function SelectionControl(props: ISelectionControlProps) {
  const { className, style, children, renderControls } = props;

  const divRef = useRef<HTMLDivElement>(null);

  // 选中的文字
  const [selectionText, setSelectionText] = useState<string>();

  // 选中内容 相对于 div 矩形区域
  const [selectionRect, setSelectionRect] = useState<DOMRect>();

  useEffect(() => {
    // 如果点击对象不在当前div内，则清除选中内容
    const windowMouseDownHandler = (event: MouseEvent) => {
      if (!divRef.current?.contains(event.target as Node)) {
        setSelectionText(undefined);
        setSelectionRect(undefined);
      }
    };
    window.addEventListener('mousedown', windowMouseDownHandler);
    return () => {
      window.removeEventListener('mousedown', windowMouseDownHandler);
    };
  }, []);

  /**
   * 鼠标抬起事件处理
   *
   * 如果有选中内容，且选中内容在当前组件内，则记录选中内容和位置
   * @param event
   */
  const mouseUpHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const selection = window.getSelection();

      if (
        selection?.rangeCount &&
        selection.rangeCount > 0 &&
        selection.toString().trim() !== '' &&
        divRef.current &&
        divRef.current.contains(selection.anchorNode as Node) &&
        divRef.current.contains(selection.focusNode as Node)
      ) {
        const range = selection.getRangeAt(0);
        const rangeRect = range.getBoundingClientRect();
        const divRect = divRef.current.getBoundingClientRect();

        // 相对div的矩形区域
        const relativeRect = new DOMRect(
          rangeRect.left - divRect.left,
          rangeRect.top - divRect.top,
          rangeRect.width,
          rangeRect.height,
        );

        // 设置选中内容和位置
        setSelectionText(selection.toString());
        setSelectionRect(relativeRect);

        event.preventDefault();
      } else {
        setSelectionText(undefined);
        setSelectionRect(undefined);
        return;
      }
    },
    [],
  );

  /**
   * 渲染控制区域
   *
   */
  const renderSelectionControls = () => {
    if (!divRef.current) {
      return;
    }
    if (selectionRect && selectionText) {
      const containerWidth = divRef.current.offsetWidth;
      const containerHeight = divRef.current.offsetHeight;
      // 默认左上角和selectionRect 左下角对齐
      // 检查top：如果top 距离div底部 <  100, 则底部和selectRect顶部对齐
      // 检查left：如果left 距离div 右侧  < 100, 则右侧和selectRect右侧对齐
      const left = selectionRect.left;
      const top = selectionRect.top + selectionRect.height;

      const style: CSSProperties = {
        left,
        top,
      };

      if (left > containerWidth - 100) {
        delete style.left;
        style.right = containerWidth - selectionRect.right;
      }
      if (top > containerHeight - 100) {
        delete style.top;
        style.bottom = containerHeight - selectionRect.top;
      }

      return (
        <div
          className='SelectionControlContainer'
          style={style}
          tabIndex={-1} // 不允许获取焦点
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          {renderControls(selectionText, closeControls)}
        </div>
      );
    }
  };

  const closeControls = () => {
    setSelectionText(undefined);
    setSelectionRect(undefined);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div
      className={classNames('SelectionControl', className)}
      style={style}
      onMouseUp={mouseUpHandler}
      ref={divRef}
    >
      {children}
      {renderSelectionControls()}
    </div>
  );
}
export default React.memo(SelectionControl);
