import XEmpty from '@/component/normal/XEmpty';
import IModalProps from '@/interface/IModalProps';
import ProjectUtil from '@/utils/ProjectUtil';
import { Alert, Button, Checkbox, Modal, Table, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import styles from './DataInsert.module.less';
interface IDataInsertProps extends IModalProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * 数据入库
 */
function DataInsert(props: IDataInsertProps) {
  const { className, style, open, onCancel, onSuccess } = props;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const [enableConfirm, setEnableConfirm] = useState(false);

  const reset = useCallback(() => {
    setConfirm(false);
    setEnableConfirm(false);
    setConfirmData(undefined);
    requestConfirmData();
  }, []);

  const submit = async () => {
    setloadingSubmit(true);
    await ProjectUtil.sleep();
    setloadingSubmit(false);
    onSuccess?.();
  };

  //#region 待确认内容

  const [confirmData, setConfirmData] = useState<any[]>();
  const [loadingConfirmData, setloadingConfirmData] = useState(false);

  const requestConfirmData = async () => {
    setloadingConfirmData(true);
    await ProjectUtil.sleep();
    setConfirmData([
      { id: 1, name: '数据1' },
      { id: 2, name: '数据2' },
      { id: 3, name: '数据3' },
    ]);
    setloadingConfirmData(false);
  };

  const renderContent = () => {
    if (!confirmData) {
      return <XEmpty loading={loadingConfirmData} />;
    }
    return (
      <div
        className={styles.Content}
        onScroll={(event) => {
          if (enableConfirm) {
            return;
          }
          const target = event.target as HTMLDivElement;
          if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
            // 滚动到底部
            if (!enableConfirm) {
              setEnableConfirm(true);
            }
          }
        }}
      >
        {confirmData.map((item, index) => {
          return (
            <div className={styles.ConfirmDataList} key={index}>
              <div className={styles.ConfirmDataItem}>
                <h6>{item.name}</h6>
                <Table />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  //#endregion

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [reset, open]);

  const openTip = open && !enableConfirm;
  return (
    <Modal
      title='数据入库'
      className={classNames(styles.DataInsert, className)}
      style={style}
      onCancel={onCancel}
      open={open}
      width={1180}
      destroyOnHidden
      footer={
        <div className='HGroup' style={{ justifyContent: 'space-between' }}>
          <Tooltip
            open={openTip}
            title='确认入库后请将页面滑至底部，确保已阅读所有信息将无法撤回'
          >
            <Checkbox
              disabled={!enableConfirm}
              checked={confirm}
              onChange={(event) => setConfirm(event.target.checked)}
            >
              我已确认入库信息
            </Checkbox>
          </Tooltip>
          <div className='HGroup'>
            <Button disabled={loadingSubmit}>取消</Button>
            <Button
              type='primary'
              disabled={!confirm}
              loading={loadingSubmit}
              onClick={submit}
            >
              确认入库
            </Button>
          </div>
        </div>
      }
    >
      <Alert message='****' showIcon />
      {renderContent()}
    </Modal>
  );
}
export default React.memo(DataInsert);
