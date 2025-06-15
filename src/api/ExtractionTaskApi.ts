import ITargetTable from '@/pages/extractionTask/interface/ITargetTable';
import ITaskFile from '@/pages/extractionTask/interface/ITaskFile';
import ProjectUtil from '@/utils/ProjectUtil';
import { RequestData } from '@ant-design/pro-components';

/**
 * ExtractionTaskApi
 */
class ExtractionTaskApi {
  /**
   * 获取目标表列表
   */
  static async getTargetTables(): Promise<ITargetTable[]> {
    await ProjectUtil.sleep();
    return new Array(20).fill(0).map((_, index) => {
      return {
        id: `table-${index + 1}`,
        name: `目标表 ${index + 1}`,
      };
    });
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
