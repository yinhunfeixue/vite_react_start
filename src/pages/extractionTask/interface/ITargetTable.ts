import { Key } from '@/preset/Types';

/**
 * 目标表
 */
export default interface ITargetTable {
  /**
   * 目标英文名称
   */
  targetEnName?: string;
  /**
   * 目标ID
   */
  targetId: number;
  /**
   * 目标名称
   */
  targetName?: string;

  /**
   * 对应的任务id
   */
  taskTargetId?: Key;
}
