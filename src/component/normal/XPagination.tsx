import AntdUtil from '@/utils/AntdUtil';
import { Pagination, PaginationProps } from 'antd';
import React from 'react';

interface IXPaginationProps extends PaginationProps {}
/**
 * XPagination
 */
function XPagination(props: IXPaginationProps) {
  return <Pagination {...AntdUtil.paginationDefaultProps} {...props} />;
}
export default React.memo(XPagination);
