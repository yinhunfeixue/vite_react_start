import IPageRequest from '@/interface/IPageRequest';
import IPageResponse from '@/interface/IPageResponse';
import ITargetTable from '@/pages/extractionTask/interface/ITargetTable';
import ITaskFile from '@/pages/extractionTask/interface/ITaskFile';
import ProjectUtil from '@/utils/ProjectUtil';
import { RequestData } from '@ant-design/pro-components';
import axios from 'axios';

/**
 * ExtractionTaskApi
 */
class ExtractionTaskApi {
  /**
   * 获取抽取任务列表
   */
  static async getExtractionTaskList(
    data: IPageRequest,
  ): Promise<IPageResponse<ITargetTable>> {
    const res = await axios.post(`/api/task/list`, data);
    return res.data;
  }

  /**
   * 获取目标表列表
   */
  static async getTargetTables(
    data: IPageRequest,
  ): Promise<IPageResponse<ITargetTable>> {
    const res = await axios.post(`/api/task/list`, data);
    return res.data;
  }

  /**
   * 分页获取文件列表
   */
  static async getFileList(params: any): Promise<RequestData<ITaskFile>> {
    await ProjectUtil.sleep();
    return {
      total: 1,
      data: [
        {
          id: 'file-1',
          fileName: '文件1',
          uploadTime: '2023-10-01 12:00:00',
          tableList: ['table-1', 'table-2'],
        },
      ],
      success: true,
    };
  }
}
export default ExtractionTaskApi;
