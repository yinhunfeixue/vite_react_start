import ResultStatus from '../enum/ResultStatus';

/**
 * TaskFileViewResponse，任务文档视图响应参数
 */
export interface ITaskExtractResult {
  /**
   * 数据表格（二维表格）
   */
  dataCell?: Array<ITaskExtractResultCell[]>;
  /**
   * 表头
   */
  header?: string[];
  /**
   * 目标英文名称
   */
  targetEnName?: string;
  /**
   * 目标名称
   */
  targetName?: string;
  /**
   * 任务目标ID
   */
  taskTargetId?: number;
}

/**
 * TaskExtractionColumnResultResponse，任务目标字段抽取结果响应参数
 */
export interface ITaskExtractResultCell {
  /**
   * 任务目标字段核检结果错误原因
   */
  failureReason?: string;
  /**
   * 任务目标字段抽取结果（为null则表示没有抽取到数据）
   */
  fieldValue?: string;
  /**
   * 关联的文件ID(物理文件ID，下载文件用)
   */
  fileId?: number;
  /**
   * 关联文件的nodeId列表
   */
  fileNodeId?: number[];
  /**
   * 任务目标字段抽取结果ID
   */
  id?: number;
  /**
   * 任务目标字段抽取结果对象编号
   */
  objNo?: string;
  /**
   * 任务目标字段核检结果状态
   */
  resultStatus?: ResultStatus;
  /**
   * 目标字段ID
   */
  targetColumnId?: number;
  /**
   * 关联的任务文件ID（业务ID）
   */
  taskFileId?: number;
}
