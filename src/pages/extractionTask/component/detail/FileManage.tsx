import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import Assets from '@/Assets';
import IconLabel from '@/component/iconLabel/IconLabel';
import LinkButton from '@/component/linkButton/LinkButton';
import XInputSearch from '@/component/normal/XInputSearch';
import XSelect from '@/component/normal/XSelect';
import UploadDragger from '@/component/uploadDragger/UploadDragger';
import AntdUtil from '@/utils/AntdUtil';
import ProjectUtil from '@/utils/ProjectUtil';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Space } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import ITargetTable from '../../interface/ITargetTable';
import ITaskFile from '../../interface/ITaskFile';
import styles from './FileManage.module.less';
interface IFileManageProps {
  className?: string;
  style?: CSSProperties;
}

interface ISearchParams {
  keyword?: string;
}

/**
 * FileManage
 */
function FileManage(props: IFileManageProps) {
  const { className, style } = props;

  const [searchParams, setSearchParams] = useState<ISearchParams>();

  const [forceUpdate, setForceUpdate] = useState(1);
  const forceUpdateTable = () => {
    setForceUpdate(forceUpdate + 1);
  };

  //#region 是否有数据
  const [hasData, setHasData] = useState(false);

  //#region

  //#region 目标表
  const [targetTables, setTargetTables] = useState<ITargetTable[]>([]);

  const requestTargetTables = async () => {
    ExtractionTaskApi.getTargetTables().then((data) => {
      console.log('data', data);

      setTargetTables(data || []);
    });
  };

  //#endregion

  const updateSearchParams = (params: ISearchParams) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  };

  const columns = useMemo<ProColumns<ITaskFile>[]>(() => {
    return [
      {
        title: '文件',
        render: (_, record) => {
          return (
            <IconLabel
              icon={<img src={Assets.fileIcon_excel} style={{ width: 16 }} />}
              label={record.fileName}
            />
          );
        },
      },
      {
        title: '上传时间',
        width: 200,
        render: (_, record) => {
          return <span>{record.uploadTime}</span>;
        },
      },
      {
        title: '映射目标表',
        width: 400,
        render: (_, record) => {
          return (
            <XSelect
              style={{ width: '100%' }}
              mode='tags'
              value={record.tableList}
              maxTagCount={3}
              options={targetTables}
              fieldNames={{ label: 'name', value: 'id' }}
              onChange={(value) => {
                record.tableList = value as string[];
                forceUpdateTable();
              }}
            />
          );
        },
      },
      {
        title: '操作',
        width: 200,
        render: (_, record) => {
          return (
            <Space
              split={<Divider type='vertical' style={{ margin: '0 4px' }} />}
            >
              <LinkButton>更新</LinkButton>
              <LinkButton>查看</LinkButton>
              <LinkButton>删除</LinkButton>
            </Space>
          );
        },
      },
    ];
  }, [targetTables]);

  useEffect(() => {
    requestTargetTables();
  }, []);

  return (
    <div className={classNames(styles.FileManage, className)} style={style}>
      <h5>文件管理</h5>
      <ProTable
        style={{ padding: 0 }}
        search={false}
        headerTitle={
          <XInputSearch
            placeholder='文件搜索'
            onSearch={(value) => updateSearchParams({ keyword: value })}
          />
        }
        toolBarRender={
          hasData
            ? () => [
                <Button ghost type='primary'>
                  上传文件
                </Button>,
              ]
            : false
        }
        params={searchParams}
        request={async (params) => {
          await ProjectUtil.sleep();
          const data = await ExtractionTaskApi.getFileList(params);

          setHasData(Boolean(data.total));
          return data;
        }}
        rowKey={(...args) => {
          return args[1] || '';
        }}
        showHeader={hasData}
        size='large'
        pagination={{
          ...AntdUtil.paginationDefaultProps,
        }}
        options={false}
        columns={columns}
        locale={{
          emptyText: <UploadDragger />,
        }}
      />
    </div>
  );
}
export default React.memo(FileManage);
