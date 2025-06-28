import TaskStatus from '../enum/TaskStatus';
import ITargetTable from './ITargetTable';
import ITaskFile from './ITaskFile';

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
  taskId: string;
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

  /**
   * 任务文件列表
   */
  taskFiles?: ITaskFile[];

  /**
   * 任务目标列表
   */
  taskTargets?: ITargetTable[];
}
