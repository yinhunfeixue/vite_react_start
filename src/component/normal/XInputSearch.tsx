import { GetProps, Input } from 'antd';
import React from 'react';
type IXInputSearchProps = GetProps<typeof Input.Search>;
/**
 * XInputSearch
 */
function XInputSearch(props: IXInputSearchProps) {
  return (
    <Input.Search
      allowClear
      placeholder='请输入'
      style={{ width: 360 }}
      {...props}
    />
  );
}
export default React.memo(XInputSearch);
