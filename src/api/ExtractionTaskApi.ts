import IPageRequest from '@/interface/IPageRequest';
import IPageResponse from '@/interface/IPageResponse';
import IExtractionTask from '@/pages/extractionTask/interface/IExtractionTask';
import { IStoragePreview } from '@/pages/extractionTask/interface/IStoragePreview';
import ITargetTable from '@/pages/extractionTask/interface/ITargetTable';
import { ITaskExtractResult } from '@/pages/extractionTask/interface/ITaskExtractResult';
import axios from 'axios';
import { Key } from 'react';

/**
 * ExtractionTaskApi
 */
class ExtractionTaskApi {
  /**
   * 获取任务列表
   */
  static async getExtractionTaskList(
    data: IPageRequest,
  ): Promise<IPageResponse<IExtractionTask>> {
    const res = await axios.post(`/api/task/list`, data);
    return res.data;
  }

  /**
   * 创建任务
   */
  static async createExtractionTask(
    data: Partial<IExtractionTask>,
  ): Promise<boolean> {
    const res = await axios.post(`/api/task/create`, data);
    return res.data;
  }

  /**
   * 删除任务
   */
  static async deleteExtractionTask(taskId: string): Promise<boolean> {
    const res = await axios.get(`/api/task/delete`, {
      params: { taskId },
    });
    return res.data;
  }

  /**
   * 获取任务详情
   */
  static async getExtractionTaskDetail(
    taskId: string,
  ): Promise<IExtractionTask> {
    const res = await axios.get(`/api/task/detail`, {
      params: { taskId },
    });
    return res.data;
  }

  /**
   * 更新任务
   */
  static async updateExtractionTask(
    data: Partial<IExtractionTask>,
  ): Promise<boolean> {
    const res = await axios.post(`/api/task/update`, data);
    return res.data;
  }

  /**
   * 保存任务文件
   */
  static async addTaskFile(data: {
    /**
     * 任务文件ID
     */
    taskFileId: Key;
    /**
     * 任务ID
     */
    taskId: Key;
  }): Promise<boolean> {
    const res = await axios.post(`/api/task/addFile`, data);
    return res.data;
  }

  /**
   * 删除任务文件
   */
  static async deleteTaskFile(taskFileId: Key): Promise<boolean> {
    const res = await axios.get(`/api/task/deleteFile`, {
      params: { taskFileId },
    });
    return res.data;
  }

  /**
   * 更新文件
   */
  static async updateTaskFile(data: {
    /**
     * 目标ID列表
     */
    targetId?: Key[];
    /**
     * 任务文件ID
     */
    taskFileId: Key;
  }): Promise<boolean> {
    const res = await axios.post(`/api/task/updateTaskFileTarget`, data);
    return res.data;
  }

  /**
   * 获取目标表列表
   */
  static async getTargetTables(): Promise<ITargetTable[]> {
    const res = await axios.get(`/api/target/list`);
    return res.data;
  }

  /**
   * 文件视角获取任务结果表格
   */
  static async getTaskResultTableByFile(params: {
    taskFileId: Key;
  }): Promise<ITaskExtractResult> {
    const res = await axios.get(`/api/task/taskFileView`, { params });
    return res.data;
  }

  /**
   * 目标表视角获取任务解雇表格
   */
  static async getTaskResultTableByTarget(params: {
    taskTargetId: Key;
  }): Promise<ITaskExtractResult> {
    const res = await axios.get(`/api/task/taskTargetView`, { params });
    return res.data;
  }

  /**
   * 获取入库记录
   */
  static async getTaskResultStorageRecord(params: {
    taskId: Key;
  }): Promise<any> {
    const res = await axios.get(`/api/task/getInDbLog`, {
      params,
    });
    return res.data;
  }

  /**
   * 获取入库预览
   */
  static async getTaskResultStoragePreview(params: {
    taskId: Key;
  }): Promise<IStoragePreview> {
    const res = await axios.get(`/api/task/getTaskAllTargetResult`, {
      params,
    });
    return res.data;
  }

  /**
   * 开始抽取任务
   */
  static async startExtractionTask(taskId: Key): Promise<boolean> {
    const res = await axios.post(`/api/task/startExtraction`, { taskId });
    return res.data;
  }

  /**
   * 获取抽取状态
   */
  static async getExtractionTaskStatus(taskId: Key): Promise<number> {
    const res = await axios.get(`/api/task/getTaskProgress`, {
      params: { taskId },
    });
    return res.data;
  }
}
export default ExtractionTaskApi;
