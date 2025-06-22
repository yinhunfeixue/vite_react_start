import IModalProps from '@/interface/IModalProps';
import { Modal } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './DataInsertRecord.module.less';
interface IDataInsertRecordProps extends IModalProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * 入库记录
 */
function DataInsertRecord(props: IDataInsertRecordProps) {
  const { className, style, open, onCancel } = props;
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
