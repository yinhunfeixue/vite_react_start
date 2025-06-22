import { ISlateNode } from '../component/resultEditor/IResultNode';

/**
 * ITaskResultTableData
 */
export default interface ITaskResultTableData {
  columns: { title: string }[];

  /**
   * 每个单元格是Array<ISlateNode[]>
   */
  dataSource: (Array<ISlateNode> | null)[][];
}
