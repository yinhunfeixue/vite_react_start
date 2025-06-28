import AntdUtil from '@/utils/AntdUtil';
import { GetProps, Select } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/es/select';

type OptionType = BaseOptionType | DefaultOptionType;
/**
 * XSelect
 */
function XSelect<V, O extends OptionType = DefaultOptionType>(
  props: GetProps<typeof Select<V, O>>,
) {
  const labelField = props.fieldNames?.label || 'label';
  return (
    <Select<V, O>
      allowClear
      showSearch
      filterOption={(input, option) => {
        return AntdUtil.defaultFilterOption(input, option, [labelField]);
      }}
      placeholder='请选择'
      {...props}
    />
  );
}
export default XSelect;
