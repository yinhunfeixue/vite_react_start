import ResultStatus from '../enum/ResultStatus';

/**
 * 数据
 *
 * TaskAllTargetResultResponse，任务所有目标结果响应参数
 */
export interface IStoragePreview {
  /**
   * 信息条数
   */
  infoCount?: number;
  /**
   * 表数量
   */
  tableCount?: number;
  /**
   * 目标结果数据
   */
  targetResultList?: TaskTargetView[];
}

/**
 * TaskTargetViewResponse，任务目标视图响应参数
 */
export interface TaskTargetView {
  /**
   * 数据表格（二维表格）
   */
  dataCell?: Array<TaskExtractionColumnResult[]>;
  /**
   * 表头
   */
  header?: string[];
  /**
   * 任务目标ID
   */
  targetId?: number;
}

/**
 * TaskExtractionColumnResultResponse，任务目标字段抽取结果响应参数
 */
export interface TaskExtractionColumnResult {
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
