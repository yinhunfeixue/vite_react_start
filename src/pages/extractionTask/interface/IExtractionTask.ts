import { Key } from 'react';

/**
 * IExtractionTask
 */
export default interface IExtractionTask {
  id: Key;
  name: string;
  desc?: string;
  createrName?: string;
  updateTime?: string;

  /**
   * 目标总数
   */
  targetCount?: number;

  /**
   * 已提取目标数量
   */
  extractedCount?: number;

  /**
   * 文件总数
   */
  fileCount?: number;

  /**
   * 已提取文件数量
   */
  extractedFileCount?: number;
}
