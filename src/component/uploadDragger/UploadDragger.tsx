import AntdUtil from '@/utils/AntdUtil';
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps, Upload } from 'antd';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './UploadDragger.module.less';
interface IUploadDraggerProps extends DraggerProps {
  icon?: ReactNode;
  desc?: ReactNode;
  extra?: ReactNode;
}

/**
 * UploadDragger
 */
function UploadDragger(props: IUploadDraggerProps) {
  const {
    className,
    icon = <InboxOutlined />,
    desc = '点击或拖入文件',
    extra,
    ...otherProps
  } = props;

  return (
    <Upload.Dragger
      {...AntdUtil.uploadDefaultProps}
      {...otherProps}
      className={classNames(styles.UploadDragger, className)}
    >
      <div className={styles.Icon}>{icon}</div>
      <p className='ant-upload-hint'>{desc}</p>
      {extra}
    </Upload.Dragger>
  );
}
export default React.memo(UploadDragger);
