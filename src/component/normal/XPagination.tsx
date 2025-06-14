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
      showTotal={(value) => (
        <>
          总数 <b>{value}</b> 条
        </>
      )}
      showQuickJumper
      showSizeChanger={false}
      {...props}
    />
  );
}
export default React.memo(XPagination);
