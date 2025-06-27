/**
 * IPageResponse
 */
export default interface IPageResponse<T> {
  /**
   * 数据集
   */
  list?: T[];
  /**
   * 当前页
   */
  pageNum?: number;
  /**
   * 总页数
   */
  pages?: number;
  /**
   * 分页大小
   */
  pageSize?: number;
  /**
   * 总数
   */
  total: number;
}
