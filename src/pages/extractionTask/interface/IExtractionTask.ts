import TaskStatus from '../enum/TaskStatus';

/**
 * IExtractionTask
 */
export default interface IExtractionTask {
  /**
   * 已完成文件数量
   */
  completedFileCount?: number;
  /**
   * 已入库目标数量
   */
  completedTargetCount?: number;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 创建人
   */
  createUser?: string;
  /**
   * 任务描述
   */
  taskDescription?: string;
  /**
   * 任务id
   */
  taskId?: number;
  /**
   * 任务名称
   */
  taskName?: string;
  /**
   * 任务状态
   */
  taskStatus?: TaskStatus;
  /**
   * 总文件数量
   */
  totalFileCount?: number;
  /**
   * 总目标数量
   */
  totalTargetCount?: number;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * 更新人
   */
  updateUser?: string;
}
