import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import PageSmallHeader from '@/component/layout/PageSmallHeader';
import LinkButton from '@/component/linkButton/LinkButton';
import XEmpty from '@/component/normal/XEmpty';
import useUrlParam from '@/hooks/UseUrlParam';
import PageUtil from '@/utils/PageUtil';
import { EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useEffect, useState } from 'react';
import styles from './ExtractionFilePage.module.less';
import TaskEdit from './component/TaskEdit';
import FileManage from './component/file/FileManage';
import IExtractionTask from './interface/IExtractionTask';
interface IExtractionFilePageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * ExtractionFilePage
 */
function ExtractionFilePage(props: IExtractionFilePageProps) {
  const { className, style } = props;
  const [urlParam] = useUrlParam();
  const { taskId } = urlParam;

  //#region 任务详情
  const [taskDetail, setTaskDetail] = useState<IExtractionTask>();
  const [loadingDetail, setLoadingDetail] = useState(false);

  const requestTaskDetail = async (taskId: string) => {
    setLoadingDetail(true);
    await ExtractionTaskApi.getExtractionTaskDetail(taskId)
      .then((data) => {
        setTaskDetail(data);
        return data;
      })
      .finally(() => {
        setLoadingDetail(false);
      });
  };

  //#endregion

  useEffect(() => {
    requestTaskDetail(taskId);
  }, [taskId]);

  if (!taskDetail) {
    return <XEmpty loading={loadingDetail} />;
  }

  return (
    <div
      className={classNames(styles.ExtractionFilePage, className)}
      style={style}
    >
      <PageSmallHeader
        title={
          <Space>
            <span>{taskDetail.taskName}</span>
            <TaskEdit
              target={taskDetail}
              onSuccess={() => requestTaskDetail(taskId)}
              trigger={
                <LinkButton type='text'>
                  <EditOutlined />
                </LinkButton>
              }
            />
          </Space>
        }
        extra={
          <Button
            type='primary'
            onClick={() => {
              PageUtil.openExtractionTaskDetailPage(taskId);
            }}
          >
            开始抽取
          </Button>
        }
      />

      <main>
        <FileManage
          className={styles.FileManage}
          task={taskDetail}
          onFileChange={() => requestTaskDetail(taskId)}
        />
      </main>
    </div>
  );
}
export default React.memo(ExtractionFilePage);
