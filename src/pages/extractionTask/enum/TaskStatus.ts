/**
 * 任务状态
 */
enum TaskStatus {
  Completed = 'COMPLETED',
  Executing = 'EXECUTING',
  Failed = 'FAILED',
  InDB = 'IN_DB',
  Waiting = 'WAITING',
}

namespace TaskStatus {
  /**
   * 枚举值列表，一般用于列表显示，例如下拉框
   */
  export const ALL_LIST: TaskStatus[] = [];

  /**
   * 枚举值转换为字符串
   */
  export function toString(value: TaskStatus) {
    const dic: { [key in TaskStatus]: string } = {
      [TaskStatus.Completed]: '完成',
      [TaskStatus.Executing]: '执行中',
      [TaskStatus.Failed]: '失败',
      [TaskStatus.InDB]: '已入库',
      [TaskStatus.Waiting]: '等待中',
    };
    return dic[value] || '';
  }
}
export default TaskStatus;
