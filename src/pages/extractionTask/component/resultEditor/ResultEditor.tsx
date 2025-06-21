import classNames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import { createEditor, Descendant, Element, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import styles from './ResultEditor.module.less';

interface IResultEditorProps {
  className?: string;
  style?: CSSProperties;
}

type IDocNode = Element & {
  type: string;
  docOption?: {
    from: string; // 来源
    sourceNodeId?: string; // 来源节点ID
  };
};

type IInserNode = Node | IDocNode;

export interface IResultEditorRef {
  /**
   * 插入节点到编辑器
   * @param nodes 要插入的节点数组
   */
  insertNodes: (nodes: IInserNode[]) => void;
}

/**
 * ResultEditor
 */
const ResultEditor = forwardRef<IResultEditorRef, IResultEditorProps>(
  (props, ref) => {
    const { className, style } = props;

    const editor = useMemo(() => {
      const result = withHistory(withReact(createEditor()));
      result.isInline = (element) => {
        const type = (element as IDocNode).type;
        return type === 'docNode';
      };
      return result;
    }, []);

    const initialValue: Descendant[] = useMemo(() => {
      return [
        {
          type: 'paragraph',
          children: [
            {
              text: 'init value',
            },
          ],
        },
      ];
    }, []);

    useImperativeHandle(ref, () => ({
      insertNodes: (nodes: IInserNode[]) => {
        editor.insertNodes(nodes);
      },
    }));

    const renderElement = useMemo(() => {
      return (props: RenderElementProps) => {
        const { attributes, children } = props;
        const element = props.element as IDocNode;
        switch (element.type as string) {
          case 'button':
            return (
              <button {...attributes} className={styles.Button}>
                {children}
              </button>
            );
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
          renderElement={renderElement}
        />
      </Slate>
    );
  },
);

ResultEditor.displayName = 'ResultEditor';

export default React.memo(ResultEditor);
