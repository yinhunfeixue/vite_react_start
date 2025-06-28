import Assets from '@/Assets';

/**
 * 文件扩展名枚举
 */
enum FileType {
  PDF = 'pdf',
  DOC = 'doc',
  DOCX = 'docx',
  XLS = 'xls',
  XLSX = 'xlsx',
  TXT = 'txt',
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  SVG = 'svg',
  ZIP = 'zip',
  RAR = 'rar',
  ZIP7 = '7z',
}

namespace FileType {
  /**
   * 枚举值列表，一般用于列表显示，例如下拉框
   */
  export const ALL_LIST: FileType[] = [];

  /**
   * 枚举值转换为字符串
   */
  export function toIcon(value?: string) {
    const dic: Partial<Record<FileType, string>> = {
      [FileType.PDF]: Assets.fileIcon_pdf,
      [FileType.DOC]: Assets.fileIcon_word,
      [FileType.DOCX]: Assets.fileIcon_word,
      [FileType.XLS]: Assets.fileIcon_excel,
      [FileType.XLSX]: Assets.fileIcon_excel,
      [FileType.TXT]: Assets.fileIcon_txt,
      [FileType.ZIP]: Assets.fileIcon_zip,
      [FileType.RAR]: Assets.fileIcon_zip,
      [FileType.ZIP7]: Assets.fileIcon_zip,
    };
    return dic[value as FileType] || Assets.fileIcon_unknow;
  }
}
export default FileType;
