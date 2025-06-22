import classNames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import IResultNode, { ISlateNode } from './IResultNode';
import styles from './ResultEditor.module.less';

interface IResultEditorProps {
  className?: string;
  style?: CSSProperties;

  initValue?: ISlateNode[] | null; // 初始值

  readOnly?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface IResultEditorRef {
  /**
   * 插入节点到编辑器
   * @param nodes 要插入的节点数组
   */
  insertNodes: (nodes: ISlateNode[]) => void;
}

/**
 * ResultEditor
 */
const ResultEditor = forwardRef<IResultEditorRef, IResultEditorProps>(
  (props, ref) => {
    const { className, style, initValue, readOnly, onClick } = props;

    const editorRef = useRef<HTMLDivElement>(null);

    const editor = useMemo(() => {
      const result = withHistory(withReact(createEditor()));
      result.isInline = (element) => {
        const type = (element as IResultNode).type;
        return type === 'docNode';
      };
      return result;
    }, []);

    const initialValue: Descendant[] = useMemo(() => {
      if (initValue) {
        return initValue;
      }
      return [
        {
          type: 'p',
          children: [{ text: '' }],
        },
      ];
    }, [initValue]);

    useImperativeHandle(ref, () => ({
      insertNodes: (nodes: ISlateNode[]) => {
        editor.insertNodes(nodes);
        editorRef.current?.focus();
      },
    }));

    const renderElement = useMemo(() => {
      return (props: RenderElementProps) => {
        const { attributes, children } = props;
        const element = props.element as IResultNode;
        switch (element.type as string) {
          case 'docNode':
            return (
              <span
                {...attributes}
                className={styles.DocNode}
                style={{ textDecoration: 'underline' }}
              >
                {children}
              </span>
            );
          default:
            return children;
        }
      };
    }, []);

    return (
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          className={classNames(styles.ResultEditor, className)}
          style={style}
          ref={editorRef}
          readOnly={readOnly}
          placeholder='请输入内容...'
          renderElement={renderElement}
          onClick={onClick}
        />
      </Slate>
    );
  },
);

export default React.memo(ResultEditor);
