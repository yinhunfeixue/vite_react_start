import AntdUtil from '@/utils/AntdUtil';
import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import styles from './XPagination.module.less';

interface IXPaginationProps extends PaginationProps {}
/**
 * XPagination
 */
function XPagination(props: IXPaginationProps) {
  return (
    <Pagination
      className={styles.XPagination}
      {...AntdUtil.paginationDefaultProps}
      {...props}
    />
  );
}
export default React.memo(XPagination);
