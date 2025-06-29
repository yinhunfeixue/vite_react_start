import axios from 'axios';
import { Key } from 'react';

/**
 * FileApi
 */
class FileApi {
  /**
   * 获取文件上传url
   */
  static get uploadUrl(): string {
    return `/api/file/upload`;
  }

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
   * 下载文件的url
   */
  static getDownloadUrl(fileId?: Key): string | null {
    if (fileId) {
      return `/api/file/download?id=${fileId}`;
    }
    return null;
  }

  /**
   * 下载文件
   */
  static async download(fileId?: Key, fileName?: string): Promise<void> {
    if (!fileId) {
      return;
    }
    const url = this.getDownloadUrl(fileId);
    if (url) {
      const res = await axios.get(url, { responseType: 'blob' });

      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.download = fileName || fileId.toString();
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  }
}
export default FileApi;
