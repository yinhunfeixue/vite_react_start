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
    icon,
    desc = '点击或拖入文件',
    extra,
    ...otherProps
  } = props;
  return (
    <Upload.Dragger
      {...otherProps}
      className={classNames(styles.UploadDragger, className)}
    >
      <div className={styles.Icon}>
        <InboxOutlined />
      </div>
      <p className='ant-upload-hint'>{desc}</p>
      {extra}
    </Upload.Dragger>
  );
}
export default React.memo(UploadDragger);
