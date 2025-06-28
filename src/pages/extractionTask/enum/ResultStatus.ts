/**
 * ResultStatus
 */
enum ResultStatus {
  CheckError = 'CHECK_ERROR',
  Normal = 'NORMAL',
}

namespace ResultStatus {
  /**
   * 枚举值列表，一般用于列表显示，例如下拉框
   */
  export const ALL_LIST: ResultStatus[] = [];

  /**
   * 枚举值转换为字符串
   */
  export function toString(value: ResultStatus) {
    const dic: { [key in ResultStatus]: string } = {
      [ResultStatus.CheckError]: '错误',
      [ResultStatus.Normal]: '成功',
    };
    return dic[value] || '';
  }
}
export default ResultStatus;
