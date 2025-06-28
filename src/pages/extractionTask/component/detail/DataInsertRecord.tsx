import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import IModalProps from '@/interface/IModalProps';
import { Modal } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, Key, useEffect } from 'react';
import styles from './DataInsertRecord.module.less';
interface IDataInsertRecordProps extends IModalProps {
  className?: string;
  style?: CSSProperties;
  taskId?: string;
}
/**
 * 入库记录
 */
function DataInsertRecord(props: IDataInsertRecordProps) {
  const { className, style, open, taskId, onCancel } = props;

  const requestDataSource = (taskId?: Key) => {
    if (!taskId) {
      return;
    }
    ExtractionTaskApi.getTaskResultStorageRecord({ taskId });
  };

  useEffect(() => {
    if (open) {
      requestDataSource(taskId);
    }
  }, [open, taskId]);

  return (
    <Modal
      title='入库记录'
      className={classNames(styles.DataInsertRecord, className)}
      style={style}
      open={open}
      onCancel={onCancel}
      width={1280}
      footer={null}
    >
      DataInsertRecord
    </Modal>
  );
}
export default React.memo(DataInsertRecord);
