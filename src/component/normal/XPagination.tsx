import AntdUtil from '@/utils/AntdUtil';
import { Pagination, PaginationProps } from 'antd';
import React from 'react';

/**
 * XPagination
 */
function XPagination(props: PaginationProps) {
  return <Pagination {...AntdUtil.paginationDefaultProps} {...props} />;
}
export default React.memo(XPagination);
