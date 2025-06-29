import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import ContentLayout from '@/component/layout/ContentLayout';
import ItemL1 from '@/component/listItem/itemL1/ItemL1';
import ListItemWrap from '@/component/listItem/ListItemWrap';
import AutoColumnGrid from '@/component/normal/autoColumnGrid/AutoColumnGrid';
import XInputSearch from '@/component/normal/XInputSearch';
import XPagination from '@/component/normal/XPagination';
import usePagination, { PaginationFetcher } from '@/hooks/usePagination';
import useUrlParam from '@/hooks/useUrlParam';
import PageUtil from '@/utils/PageUtil';
import { Button, Modal, Spin } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { CSSProperties, useCallback } from 'react';
import TaskEdit from './component/TaskEdit';
import styles from './ExtractionListPage.module.less';
import IExtractionTask from './interface/IExtractionTask';

interface IExtractionListPageProps {
  className?: string;
  style?: CSSProperties;
}

interface ISearchParams {
  keyword?: string;
}
/**
 * ExtractionListPage
 */
function ExtractionListPage(props: IExtractionListPageProps) {
  const { className, style } = props;

  const [urlParam, setUrlParam] = useUrlParam<ISearchParams>();

  const { keyword } = urlParam;

  const requestPageList = useCallback<PaginationFetcher<IExtractionTask>>(
    async (params) => {
      return await ExtractionTaskApi.getExtractionTaskList({
        ...params,
        ...urlParam,
      });
    },
    [urlParam],
  );

  const pageData = usePagination<IExtractionTask>(requestPageList);
  const { dataSource, total, currentPage, pageSize, loading, goToPage } =
    pageData;

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
            <TaskEdit
              trigger={<Button type='primary'>新增任务</Button>}
              onSuccess={() => {
                pageData.refresh();
              }}
            />
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
        <XInputSearch
          placeholder='任务搜索'
          defaultValue={keyword}
          onSearch={(value) => {
            setUrlParam({ keyword: value });
          }}
        />
        <Spin spinning={loading}>
          <AutoColumnGrid maxColumn={4}>
            {dataSource.map((item, index) => {
              return (
                <ListItemWrap
                  key={index}
                  onClick={() => {
                    PageUtil.openExtractionTaskFileManagePage(item.taskId);
                  }}
                >
                  <ItemL1
                    title={{ text: item.taskName }}
                    subTitle={
                      item.updateUser
                        ? `${item.updateUser}更新于${dayjs(
                            item.updateTime,
                          ).format('MM月DD日 HH:mm')}`
                        : '-'
                    }
                    contents={[
                      {
                        icon: '',
                        text: <>创建人: {item.createUser}</>,
                      },
                      {
                        icon: '',
                        text: (
                          <>
                            目标: {item.completedTargetCount}/
                            {item.totalTargetCount}
                          </>
                        ),
                      },
                      {
                        icon: '',
                        text: (
                          <>
                            文件: {item.completedFileCount}/
                            {item.totalFileCount}
                          </>
                        ),
                      },
                    ]}
                    menus={[
                      {
                        key: 'delete',
                        label: '删除',
                        danger: true,
                        onClick: () => {
                          Modal.confirm({
                            title: '确认删除任务',
                            content: `是否确认删除任务 "${item.taskName}"?`,
                            okText: '删除',
                            cancelText: '取消',
                            onOk: () => {
                              return ExtractionTaskApi.deleteExtractionTask(
                                item.taskId,
                              ).then((res) => {
                                if (res) {
                                  pageData.refresh();
                                }
                              });
                            },
                          });
                        },
                      },
                    ]}
                  />
                </ListItemWrap>
              );
            })}
          </AutoColumnGrid>
        </Spin>
      </ContentLayout>
    </div>
  );
}
export default React.memo(ExtractionListPage);
