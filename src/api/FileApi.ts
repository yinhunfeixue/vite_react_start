import axios from 'axios';

/**
 * FileApi
 */
class FileApi {
  /**
   * 上传文件
   */
  static async uploadFile(
    file: File,
    fileModuleName?: string,
  ): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileModuleName', fileModuleName || 'default');

    const res = await axios.postForm('/api/file/upload', formData);

    return res.data;
  }

  /**
   * 下载文件
   */
  static async downloadFile(fileId: string): Promise<Blob> {
    const response = await axios.get(`/api/file/download`, {
      params: { fileId },
    });
    return response.data;
  }
}
export default FileApi;
