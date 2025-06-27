import IPageRequest from '@/interface/IPageRequest';
import IPageResponse from '@/interface/IPageResponse';
import IExtractionTask from '@/pages/extractionTask/interface/IExtractionTask';
import ITargetTable from '@/pages/extractionTask/interface/ITargetTable';
import axios from 'axios';

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
   * 上传任务文件
   */
  static async uploadTaskFile(data: {
    /**
     * 任务文件ID
     */
    taskFileId: number;
    /**
     * 任务ID
     */
    taskId: number;
  }): Promise<boolean> {
    const res = await axios.post(`/api/task/addFile`, data);
    return res.data;
  }

  /**
   * 获取目标表列表
   */
  static async getTargetTables(data: IPageRequest): Promise<ITargetTable> {
    return [];
  }
}
export default ExtractionTaskApi;
