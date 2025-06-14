import XInputSearch from '@/component/normal/XInputSearch';
import { Button, Table } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './FileManage.module.less';
interface IFileManageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * FileManage
 */
function FileManage(props: IFileManageProps) {
  const { className, style } = props;
  return (
    <div className={classNames(styles.FileManage, className)} style={style}>
      <h5>文件管理</h5>
      <div className='HGroupSpace'>
        <XInputSearch placeholder='文件搜索' />
        <Button ghost type='primary'>
          上传文件
        </Button>
      </div>
      <Table />
    </div>
  );
}
export default React.memo(FileManage);
