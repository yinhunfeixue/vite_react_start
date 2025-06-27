/**
 * IPageRequest
 */
export default interface IPageRequest {
  /**
   * 页码
   */
  pageNum?: number;
  /**
   * 分页大小
   */
  pageSize?: number;

  /**
   * 其他参数
   */
  [key: string]: any;
}
