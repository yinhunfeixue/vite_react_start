/**
 * 文件抽取状态
 */
enum ExtractorStatus {
  Completed = 'COMPLETED',
  Extracting = 'EXTRACTING',
  Failed = 'FAILED',
  NotData = 'NOT_DATA',
  NotStarted = 'NOT_STARTED',
  WaitForReview = 'WAIT_FOR_REVIEW',
}

namespace ExtractorStatus {
  /**
   * 枚举值列表，一般用于列表显示，例如下拉框
   */
  export const ALL_LIST: ExtractorStatus[] = [];

  /**
   * 枚举值转换为字符串
   */
  export function toString(value: ExtractorStatus) {
    const dic: { [key in ExtractorStatus]: string } = {
      [ExtractorStatus.Completed]: '完成',
      [ExtractorStatus.Extracting]: '提取中',
      [ExtractorStatus.Failed]: '失败',
      [ExtractorStatus.NotData]: '无数据',
      [ExtractorStatus.NotStarted]: '未开始',
      [ExtractorStatus.WaitForReview]: '待审核',
    };
    return dic[value] || '';
  }
}
export default ExtractorStatus;
