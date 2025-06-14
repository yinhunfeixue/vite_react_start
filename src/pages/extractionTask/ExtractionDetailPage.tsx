import PageSmallHeader from '@/component/layout/PageSmallHeader';
import LinkButton from '@/component/linkButton/LinkButton';
import { EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './ExtractionDetailPage.module.less';
import FileManage from './component/detail/FileManage';
interface IExtractionDetailPageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * ExtractionDetailPage
 */
function ExtractionDetailPage(props: IExtractionDetailPageProps) {
  const { className, style } = props;
  return (
    <div
      className={classNames(styles.ExtractionDetailPage, className)}
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
export default React.memo(ExtractionDetailPage);
