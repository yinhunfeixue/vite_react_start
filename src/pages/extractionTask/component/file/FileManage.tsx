import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import IconLabel from '@/component/iconLabel/IconLabel';
import LinkButton from '@/component/linkButton/LinkButton';
import XInputSearch from '@/component/normal/XInputSearch';
import XSelect from '@/component/normal/XSelect';
import XUpload from '@/component/normal/XUpload';
import UploadDragger from '@/component/uploadDragger/UploadDragger';
import useUrlParam from '@/hooks/UseUrlParam';
import FileType from '@/interface/FileType';
import AntdUtil from '@/utils/AntdUtil';
import ProjectUtil from '@/utils/ProjectUtil';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, Space } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ExtractorStatus from '../../enum/ExtractorStatus';
import IExtractionTask from '../../interface/IExtractionTask';
import ITargetTable from '../../interface/ITargetTable';
import ITaskFile from '../../interface/ITaskFile';
import styles from './FileManage.module.less';
interface IFileManageProps {
  className?: string;
  style?: CSSProperties;

  onFileChange?: () => void;

  task: IExtractionTask;
}

interface ISearchParams {
  keyword?: string;
}

/**
 * FileManage
 */
function FileManage(props: IFileManageProps) {
  const { className, style, onFileChange, task } = props;

  //#region 文件列表
  const [urlParams, setUrlParams] = useUrlParam<ISearchParams>();
  const { taskFiles } = task;

  const [uploadingFile, setUploadingFile] = useState(false);

  const displayTaskFiles = useMemo(() => {
    if (!taskFiles) {
      return [];
    }

    const keyword = urlParams?.keyword;
    if (!keyword) {
      return taskFiles;
    }
    return taskFiles.filter((file) => {
      return file.taskFileName?.includes(keyword);
    });
  }, [taskFiles, urlParams]);

  /**
   * 删除文件
   */
  const deleteFile = useCallback(
    (file: ITaskFile) => {
      ExtractionTaskApi.deleteTaskFile(file.taskFileId).then(() => {
        onFileChange?.();
      });
    },
    [onFileChange],
  );

  /**
   * 更新文件
   */
  const updateFile = useCallback(
    (file: ITaskFile) => {
      ExtractionTaskApi.updateTaskFile({
        taskFileId: file.taskFileId,
        targetId: file.targetId,
      }).then(() => {
        onFileChange?.();
      });
    },
    [onFileChange],
  );

  /**
   * 文件上传后，添加文件到任务
   */
  const handleFileUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    switch (info.file.status) {
      case 'uploading':
        setUploadingFile(true);
        break;
      case 'error':
        setUploadingFile(false);
        break;
      case 'removed':
        setUploadingFile(false);
        break;
      case 'done':
        setUploadingFile(false);
        const id = info.file.response.data;
        addTaskFile(id).then(() => {
          onFileChange?.();
        });
        break;
    }
  };

  const addTaskFile = async (fileId: string) => {
    return ExtractionTaskApi.addTaskFile({
      taskId: task.taskId,
      taskFileId: fileId,
    });
  };

  //#endregion

  const [forceUpdate, setForceUpdate] = useState(1);
  const forceUpdateTable = useCallback(() => {
    setForceUpdate(forceUpdate + 1);
  }, [forceUpdate]);

  //#region 是否有数据
  const hasData = Boolean(taskFiles?.length);

  //#region

  //#region 目标表
  const [targetTables, setTargetTables] = useState<ITargetTable[]>([]);

  const requestTargetTables = async () => {
    const tables = await ExtractionTaskApi.getTargetTables();
    setTargetTables(tables);
  };

  useEffect(() => {
    requestTargetTables();
  }, []);

  //#endregion

  const updateSearchParams = (params: ISearchParams) => {
    setUrlParams({
      ...urlParams,
      ...params,
    });
  };

  const columns = useMemo<ProColumns<ITaskFile>[]>(() => {
    return [
      {
        title: '文件',
        width: '30%',
        render: (_, record) => {
          return (
            <IconLabel
              icon={
                <img
                  src={FileType.toIcon(record.taskFileFormat)}
                  style={{ width: 16 }}
                />
              }
              label={record.taskFileName}
            />
          );
        },
      },
      {
        title: '上传时间',
        width: 200,
        render: (_, record) => {
          return <span>{ProjectUtil.formatDate(record.uploadTime)}</span>;
        },
      },
      {
        title: '映射目标表',
        render: (_, record) => {
          return (
            <XSelect
              style={{ width: '100%' }}
              mode='tags'
              value={record.targetId}
              maxTagCount={3}
              options={targetTables}
              fieldNames={{ label: 'targetName', value: 'targetId' }}
              onChange={(value) => {
                record.targetId = value as string[];
                forceUpdateTable();
              }}
            />
          );
        },
      },
      {
        title: '操作',
        width: 180,
        render: (_, record) => {
          const { extractorStatus } = record;

          const disabledDelete = [ExtractorStatus.Completed].includes(
            extractorStatus,
          );

          // 更新是否需要二次确认
          const needConfirmUpdate = [ExtractorStatus.Completed].includes(
            extractorStatus,
          );

          return (
            <Space
              split={<Divider type='vertical' style={{ margin: '0 4px' }} />}
            >
              <Popconfirm
                title='文件更新'
                description='文件已抽取完成，是否更新文件？'
                okText='更新文件'
                disabled={!needConfirmUpdate}
                onConfirm={() => {
                  updateFile(record);
                }}
              >
                <span>
                  <LinkButton
                    onClick={() => {
                      if (!needConfirmUpdate) {
                        updateFile(record);
                      }
                    }}
                  >
                    更新
                  </LinkButton>
                </span>
              </Popconfirm>

              <LinkButton>查看</LinkButton>
              <Popconfirm
                title='确定删除该文件吗？'
                onConfirm={() => deleteFile(record)}
              >
                <span>
                  <LinkButton disabled={disabledDelete}>删除</LinkButton>
                </span>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, [targetTables, forceUpdateTable, deleteFile, updateFile]);

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
        dataSource={displayTaskFiles}
        toolBarRender={
          hasData
            ? () => [
                <XUpload
                  key='upload'
                  onChange={handleFileUpload}
                  showUploadList={false}
                >
                  <Button ghost type='primary' loading={uploadingFile}>
                    上传文件
                  </Button>
                </XUpload>,
              ]
            : false
        }
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
          emptyText: (
            <UploadDragger
              onChange={handleFileUpload}
              loading={uploadingFile}
              showUploadList={false}
            />
          ),
        }}
      />
    </div>
  );
}
export default React.memo(FileManage);
