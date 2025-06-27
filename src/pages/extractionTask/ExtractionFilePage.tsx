import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import PageSmallHeader from '@/component/layout/PageSmallHeader';
import LinkButton from '@/component/linkButton/LinkButton';
import useUrlParam from '@/hooks/UseUrlParam';
import { EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useEffect, useState } from 'react';
import styles from './ExtractionFilePage.module.less';
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

  const requestTaskDetail = async (taskId: string) => {
    return await ExtractionTaskApi.getExtractionTaskDetail(taskId).then(
      (data) => {
        setTaskDetail(data);
        return data;
      },
    );
  };

  console.log('taskId', taskId);

  //#endregion

  useEffect(() => {
    requestTaskDetail(taskId);
  }, [taskId]);

  return (
    <div
      className={classNames(styles.ExtractionFilePage, className)}
      style={style}
    >
      <PageSmallHeader
        title={
          <Space>
            <span>*****演习</span>
            <LinkButton type='text'>
              <EditOutlined />
            </LinkButton>
          </Space>
        }
        extra={<Button type='primary'>开始抽取</Button>}
      />

      <main>
        <FileManage className={styles.FileManage} />
      </main>
    </div>
  );
}
export default React.memo(ExtractionFilePage);
