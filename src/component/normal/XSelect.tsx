import AntdUtil from '@/utils/AntdUtil';
import { GetProps, Select } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import React from 'react';

type OptionType = BaseOptionType | DefaultOptionType;
interface IXSelectProps<V, O extends OptionType = DefaultOptionType>
  extends GetProps<typeof Select<V, O>> {}
/**
 * XSelect
 */
function XSelect<V, O extends OptionType = DefaultOptionType>(
  props: IXSelectProps<V, O>,
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
export default React.memo(XSelect);
