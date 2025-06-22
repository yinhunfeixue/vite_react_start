import { LoadingOutlined } from '@ant-design/icons';
import { Empty, GetProps, Spin } from 'antd';
import React from 'react';
interface IXEmptyProps extends GetProps<typeof Empty> {
  loading?: boolean; // 是否加载中
}
/**
 * XEmpty
 */
function XEmpty(props: IXEmptyProps) {
  const { loading, ...otherProps } = props;

  const image = Empty.PRESENTED_IMAGE_SIMPLE;
  const element = (
    <Empty
      {...otherProps}
      description={loading ? '加载中...' : '暂无数据'}
      image={image}
    />
  );

  return loading ? (
    <Spin indicator={<LoadingOutlined spin />} size='small'>
      {element}
    </Spin>
  ) : (
    element
  );
}
export default React.memo(XEmpty);
