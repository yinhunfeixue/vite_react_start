import { PaginationProps } from 'antd';
import { BaseOptionType } from 'antd/es/select';

/**
 * AntdUtil
 */
class AntdUtil {
  static paginationDefaultProps: PaginationProps = {
    showTotal: (value) => (
      <>
        总数 <b>{value}</b> 条
      </>
    ),
    showQuickJumper: true,
    showSizeChanger: false,
  };

  static defaultFilterOption(
    input: string,
    option: BaseOptionType | undefined,
    fieldNames: string[],
  ): boolean {
    if (!option) {
      return false;
    }
    const fieldValues = fieldNames.map((item) => option[item]);
    return fieldValues.find(
      (item) => item && item.toLowerCase().includes(input.toLowerCase()),
    );
  }
}
export default AntdUtil;
