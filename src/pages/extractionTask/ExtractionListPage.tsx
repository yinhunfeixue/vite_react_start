import ItemL1 from '@/component/listItem/itemL1/ItemL1';
import ListItemWrap from '@/component/listItem/ListItemWrap';
import AutoColumnGrid from '@/component/normal/autoColumnGrid/AutoColumnGrid';
import XPagination from '@/component/normal/XPagination';
import ContentLayout from '@/component/page/ContentLayout';
import usePagination, { PaginationFetcher } from '@/hooks/usePagination';
import ProjectUtil from '@/utils/ProjectUtil';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useCallback } from 'react';
import TaskEdit from './component/TaskEdit';
import styles from './ExtractionListPage.module.less';
import IExtractionTask from './interface/IExtractionTask';
interface IExtractionListPageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * ExtractionListPage
 */
function ExtractionListPage(props: IExtractionListPageProps) {
  const { className, style } = props;

  const requestPageList = useCallback<
    PaginationFetcher<IExtractionTask>
  >(async () => {
    console.log('request');
    await ProjectUtil.sleep();

    return {
      total: 123,
      list: new Array(20).fill(0).map((_, index) => ({
        id: index,
        name: `任务 ${index + 1}`,
      })),
    };
  }, []);

  const pageData = usePagination<IExtractionTask>(requestPageList);
  const { dataSource, total, currentPage, pageSize, loading, goToPage } =
    pageData;

  console.log('loading', loading);

  return (
    <div
      className={classNames(styles.ExtractionListPage, className)}
      style={style}
    >
      <ContentLayout
        className={styles.ContentLayout}
        header={{
          title: '任务列表',
          extra: (
            <TaskEdit trigger={<Button type='primary'>新增任务</Button>} />
          ),
        }}
        footer={
          <XPagination
            total={total}
            current={currentPage}
            pageSize={pageSize}
            disabled={loading}
            onChange={(page) => goToPage(page)}
          />
        }
      >
        <AutoColumnGrid maxColumn={4}>
          {dataSource.map((item, index) => {
            return (
              <ListItemWrap key={index} onClick={() => {}}>
                <ItemL1
                  key={item.id}
                  title={{ text: item.name }}
                  contents={[
                    {
                      icon: '',
                      text: <>创建人: {item.createrName}</>,
                    },
                    {
                      icon: '',
                      text: (
                        <>
                          目标: {item.extractedCount}/{item.extractedCount}
                        </>
                      ),
                    },
                    {
                      icon: '',
                      text: (
                        <>
                          文件: {item.extractedFileCount}/{item.fileCount}
                        </>
                      ),
                    },
                  ]}
                />
              </ListItemWrap>
            );
          })}
        </AutoColumnGrid>
      </ContentLayout>
    </div>
  );
}
export default React.memo(ExtractionListPage);
