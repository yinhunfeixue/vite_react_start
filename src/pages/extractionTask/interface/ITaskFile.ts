import { Key } from 'react';
import ExtractorStatus from '../enum/ExtractorStatus';

/**
 * ITaskFile
 */
export default interface ITaskFile {
  /**
   * 文件抽取失败原因
   */
  extractorFailureReason?: string;
  /**
   * 文件抽取状态
   */
  extractorStatus: ExtractorStatus;
  /**
   * 文件ID(下载文件用)
   */
  fileId?: Key;
  /**
   * 任务文件格式
   */
  taskFileFormat?: string;
  /**
   * 任务文件ID(业务ID)
   */
  taskFileId: Key;
  /**
   * 任务文件名称
   */
  taskFileName?: string;
  /**
   * 上传时间
   */
  uploadTime?: Date;

  targetId?: string[];
}
