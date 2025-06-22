import { Element, Node } from 'slate';

/**
 * 抽取结果节点数据
 */
type IResultNode = Element & {
  type: string;
  docOption?: {
    from: string; // 来源
    sourceNodeId?: string; // 来源节点ID
  };
  children: ISlateNode[];
};

export type ISlateNode = Node | IResultNode;

export default IResultNode;
