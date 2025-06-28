import AntdUtil from '@/utils/AntdUtil';
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps, Spin, Upload } from 'antd';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './UploadDragger.module.less';
interface IUploadDraggerProps extends DraggerProps {
  icon?: ReactNode;
  desc?: ReactNode;
  extra?: ReactNode;

  /**
   * 是否显示加载状态
   */
  loading?: boolean;
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
    loading,
    ...otherProps
  } = props;

  return (
    <Upload.Dragger
      {...AntdUtil.uploadDefaultProps}
      {...otherProps}
      className={classNames(styles.UploadDragger, className)}
    >
      <Spin spinning={loading}>
        <div className={styles.Icon}>{icon}</div>
        <p className='ant-upload-hint'>{desc}</p>
        {extra}
      </Spin>
    </Upload.Dragger>
  );
}
export default React.memo(UploadDragger);
