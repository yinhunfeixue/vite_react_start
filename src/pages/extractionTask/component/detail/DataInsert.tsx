import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import XEmpty from '@/component/normal/XEmpty';
import IModalProps from '@/interface/IModalProps';
import { Alert, Button, Checkbox, Modal, Table, Tooltip } from 'antd';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IStoragePreview } from '../../interface/IStoragePreview';
import styles from './DataInsert.module.less';
interface IDataInsertProps extends IModalProps {
  className?: string;
  style?: CSSProperties;

  /**
   * 任务id
   */
  taskId?: string;
}
/**
 * 数据入库
 */
function DataInsert(props: IDataInsertProps) {
  const { className, style, open, taskId, onCancel, onSuccess } = props;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const [enableConfirm, setEnableConfirm] = useState(false);

  const submit = async () => {
    if (!taskId) {
      return;
    }
    setloadingSubmit(true);
    ExtractionTaskApi.confirmStorage({ taskId })
      .then(() => {
        onSuccess?.();
      })
      .finally(() => {
        setloadingSubmit(false);
      });
  };

  //#region 待确认内容

  const [confirmData, setConfirmData] = useState<IStoragePreview>();
  const [loadingConfirmData, setloadingConfirmData] = useState(false);

  const requestConfirmData = useCallback(async () => {
    if (!taskId) {
      setConfirmData(undefined);
      return;
    }
    setloadingConfirmData(true);
    ExtractionTaskApi.getTaskResultStoragePreview({ taskId })
      .then((data) => {
        setConfirmData(data);
      })
      .finally(() => {
        setloadingConfirmData(false);
      });
  }, [taskId]);

  const reset = useCallback(() => {
    setConfirm(false);
    setEnableConfirm(false);
    setConfirmData(undefined);
    requestConfirmData();
  }, [requestConfirmData]);

  const renderMessage = () => {
    if (!confirmData) {
      return null;
    }
    const { tableCount, infoCount } = confirmData;
    return (
      <Alert
        message={`此次入库包含：${tableCount}张表，${infoCount}项信息。请您核对并确认无误后再提交，提交后信息将无法修改。`}
        showIcon
      />
    );
  };

  const scollerRef = useRef<HTMLDivElement>(null);

  const renderContent = () => {
    if (!confirmData) {
      return <XEmpty loading={loadingConfirmData} />;
    }

    const { targetResultList } = confirmData;
    return (
      <div
        ref={scollerRef}
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
        {targetResultList?.length ? (
          targetResultList.map((item, index) => {
            return (
              <div className={styles.ConfirmDataList} key={index}>
                <div className={styles.ConfirmDataItem}>
                  <h6>{item.targetId}</h6>
                  <Table
                    columns={item.header?.map((item, columnIndex) => {
                      return {
                        title: item,
                        render(_, record) {
                          return (record as Array<any>)[columnIndex];
                        },
                      };
                    })}
                    dataSource={item.dataCell as any}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <XEmpty />
        )}
      </div>
    );
  };

  //#endregion

  useEffect(() => {
    if (scollerRef.current) {
      // 如果无需滚动，直接启用同意的选择框
      if (scollerRef.current.scrollHeight <= scollerRef.current.clientHeight) {
        setEnableConfirm(true);
      } else {
        setEnableConfirm(false);
      }
    }
  }, [confirmData]);

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
      {renderMessage()}
      {renderContent()}
    </Modal>
  );
}
export default React.memo(DataInsert);
