import LinkButton from '@/component/linkButton/LinkButton';
import ListItemWrap2 from '@/component/listItem/listItemWrap2/ListItemWrap2';
import ProjectUtil from '@/utils/ProjectUtil';
import {
  CloseOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  GetProp,
  Input,
  List,
  Menu,
  message,
  Progress,
  Space,
  Tabs,
} from 'antd';
import classNames from 'classnames';
import React, {
  CSSProperties,
  Key,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './TaskDetail.module.less';

import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import PageSmallHeader from '@/component/layout/PageSmallHeader';
import AutoTip from '@/component/normal/autoTip/AutoTip';
import XEmpty from '@/component/normal/XEmpty';
import XInputSearch from '@/component/normal/XInputSearch';
import SelectionControl from '@/component/selectionControl/SelectionControl';
import { TextAreaRef } from 'antd/es/input/TextArea';
import TaskStatus from '../../enum/TaskStatus';
import IExtractionTask from '../../interface/IExtractionTask';
import { ITaskExtractResult } from '../../interface/ITaskExtractResult';
import DataInsert from './DataInsert';
import DataInsertRecord from './DataInsertRecord';
import DocumentItem from './DocumentItem';
interface ITaskDetailProps {
  className?: string;
  style?: CSSProperties;

  /**
   * 任务ID
   */
  taskId?: string;
}
/**
 * TaskDetail
 */
function TaskDetail(props: ITaskDetailProps) {
  const { className, style, taskId } = props;

  const [taskDetail, setTaskDetail] = useState<IExtractionTask>();
  const [loadingTaskDetail, setLoadingTaskDetail] = useState(false);

  const requestTaskDetail = async (taskId?: string) => {
    if (!taskId) {
      setTaskDetail(undefined);
      return;
    }
    setLoadingTaskDetail(true);
    ExtractionTaskApi.getExtractionTaskDetail(taskId)
      .then((data) => {
        setTaskDetail(data);
      })
      .finally(() => {
        setLoadingTaskDetail(false);
      });
  };

  useEffect(() => {
    requestTaskDetail(taskId);
  }, [taskId]);

  //#region 页面状态
  type tabType = 'targetTable' | 'document';
  const [openList, setopenList] = useState(true);
  const [selectedTabKey, setSelectedTabKey] = useState<tabType>();

  // 选择的目标id
  const [selectedTargetType, setSelectedTargetType] = useState<tabType>();
  const [selectedTargetKey, setSelectedTargetKey] = useState<Key>();
  //#endregion

  //#region 抽取结果

  const [taskResultData, setTaskResultData] = useState<ITaskExtractResult>();
  const [loadingTaskResultData, setLoadingTaskResultData] = useState(false);

  // 单元格的ref列表
  const cellRefs = useRef<(TextAreaRef | null)[][]>([]);
  const [editingRef, setEditingRef] = useState<{
    rowIndex: number;
    cellIndex: number;
    textAreaRef: TextAreaRef | null;
  }>();

  const requestTaskResultData = useCallback(async () => {
    setTaskResultData(undefined);
    if (!selectedTargetType || !selectedTargetKey) {
      return;
    }
    setLoadingTaskResultData(true);

    // 目标视角、文档视角使用不同的接口
    const promise =
      selectedTargetType === 'targetTable'
        ? ExtractionTaskApi.getTaskResultTableByTarget({
            taskTargetId: selectedTargetKey,
          })
        : ExtractionTaskApi.getTaskResultTableByFile({
            taskFileId: selectedTargetKey,
          });
    promise
      .then((data) => {
        data = {
          header: ['a', 'b'],
          dataCell: [
            [
              {
                fieldValue: '这是一个测试数据',
              },
              {
                fieldValue: '这是另一个测试数据',
              },
            ],
          ],
        };
        setTaskResultData(data);
        cellRefs.current = [];
      })
      .finally(() => {
        setLoadingTaskResultData(false);
      });
  }, [selectedTargetType, selectedTargetKey]);

  const renderResultTable = () => {
    if (!taskResultData) {
      return <XEmpty loading={loadingTaskResultData} />;
    }

    const { header, dataCell } = taskResultData;
    return (
      <table className={styles.ResultTable}>
        <thead>
          <tr>
            {header?.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataCell?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                return (
                  <td key={cellIndex}>
                    <Input.TextArea
                      onFocus={() => {
                        const currentCellRefs =
                          cellRefs.current[rowIndex][cellIndex];
                        if (currentCellRefs) {
                          setEditingRef({
                            rowIndex,
                            cellIndex,
                            textAreaRef: currentCellRefs,
                          });
                        }
                      }}
                      className={styles.ResultEditor}
                      value={cell.fieldValue}
                      ref={(ref) => {
                        if (!cellRefs.current[rowIndex]) {
                          cellRefs.current[rowIndex] = [];
                        }
                        cellRefs.current[rowIndex][cellIndex] = ref;
                      }}
                      onChange={(event) => {
                        const value = event.target.value;
                        cell.fieldValue = value;
                        setTaskResultData({ ...taskResultData });
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderTaskResult = () => {
    if (!taskDetail) {
      return null;
    }

    const { taskStatus } = taskDetail;

    return (
      <div className={styles.TaskResult}>
        <div>
          <h5 onClick={() => setOpenDocument(true)}>抽取结果</h5>
          <div>最新抽取时间: ****</div>
        </div>
        {[TaskStatus.Completed, TaskStatus.InDB].includes(taskStatus) ? (
          <>
            <Alert message='a*****' showIcon />
            {renderResultTable()}
          </>
        ) : (
          renderProgress()
        )}
      </div>
    );
  };

  const renderProgress = () => {
    if (!taskDetail) {
      return null;
    }
    const { taskStatus } = taskDetail;
    let label: ReactNode;

    if (taskStatus === TaskStatus.Failed) {
      label = (
        <>
          数据抽取失败, 请<a>重新抽取</a>
        </>
      );
    } else {
      label = '文件越大，数据抽取所需时间可能越长...';
    }

    return (
      <div className='VGroup' style={{ marginTop: 100, gap: 20 }}>
        <Progress type='circle' percent={taskProgress} size={128} />
        <div>{label}</div>
      </div>
    );
  };

  const renderListAndResult = () => {
    return (
      <div
        className={classNames(
          styles.ListAndResult,
          openList && styles.ListAndResultOpenList,
        )}
      >
        <PageSmallHeader
          title={
            <Space>
              <span>{taskDetail?.taskName}</span>
              <LinkButton type='text'>
                <EditOutlined />
              </LinkButton>
            </Space>
          }
          extra={
            <>
              <LinkButton onClick={() => setOpenDataInsertRecord(true)}>
                入库记录
              </LinkButton>
              <LinkButton>文件管理</LinkButton>
              <Button type='primary' onClick={() => setOpenDataInsert(true)}>
                数据入库
              </Button>
            </>
          }
        />
        <main>
          {renderList()}
          {renderTaskResult()}
          <LinkButton
            className={styles.BtnOpen}
            onClick={() => setopenList(true)}
          >
            <RightOutlined style={{ fontSize: 12 }} />
          </LinkButton>
        </main>
      </div>
    );
  };

  //#endregion

  //#region 目标tab

  const renderTargetTableList = () => {
    const taskTargets = taskDetail?.taskTargets;
    return (
      <List
        header={<Input prefix={<SearchOutlined />} placeholder='目标搜索' />}
        dataSource={taskTargets}
        split={false}
        style={{ padding: '4px' }}
        renderItem={(item) => {
          const selected = selectedTargetKey === item.targetId;
          return (
            <ListItemWrap2
              style={{ padding: '8px 12px' }}
              selected={selected}
              onClick={() => {
                setSelectedTargetType('targetTable');
                setSelectedTargetKey(item.targetId);
              }}
            >
              <AutoTip
                content={ProjectUtil.renderName(
                  item.targetName,
                  item.targetEnName,
                )}
              />
            </ListItemWrap2>
          );
        }}
      />
    );
  };

  const renderDocumentList = () => {
    const taskFiles = taskDetail?.taskFiles;
    return (
      <List
        header={<Input prefix={<SearchOutlined />} placeholder='文档搜索' />}
        dataSource={taskFiles}
        split={false}
        style={{ padding: '4px' }}
        renderItem={(item) => {
          const selected = selectedTargetKey === item.taskFileId;
          return (
            <ListItemWrap2
              selected={selected}
              onClick={() => {
                setSelectedTargetKey(item.taskFileId);
                setSelectedTargetType('document');
              }}
            >
              {<DocumentItem data={item} />}
            </ListItemWrap2>
          );
        }}
      />
    );
  };

  const tabItems: GetProp<typeof Tabs, 'items'> = [
    {
      key: 'targetTable',
      label: '目标视角',
      children: renderTargetTableList(),
    },
    {
      key: 'extractionRule',
      label: '文档视角',
      children: renderDocumentList(),
    },
  ];

  const renderList = () => {
    return (
      <div className={styles.TabWrap}>
        <Tabs
          activeKey={selectedTabKey}
          onChange={(key) => {
            setSelectedTabKey(key as tabType);
          }}
          items={tabItems.map((item) => ({ ...item, children: null }))}
          tabBarExtraContent={
            <LinkButton type='text' onClick={() => setopenList(false)}>
              <LeftOutlined style={{ fontSize: 12 }} /> 收起
            </LinkButton>
          }
          tabBarStyle={{ paddingLeft: 16, paddingRight: 16 }}
        />
        <Tabs
          activeKey={selectedTabKey}
          items={tabItems}
          renderTabBar={() => <></>}
        />
      </div>
    );
  };
  //#endregion

  //#region 文档

  const [openDocument, setOpenDocument] = useState(true);

  const [documentContent, setDocumentContent] = useState<string>();

  const requestDocumentContent = async () => {
    await ProjectUtil.sleep();
    setDocumentContent(
      `aaaa <span style="color: red;">这是文档内容的示例文本。可以在这里展示文档的详细内容。</span> <span style="color: blue;">可以使用不同的颜色来突出显示文本。</span> 这是一个简单的示例，展示了如何在文档中使用 HTML 标签来格式化文本。<h3>标题</h3> <p>这是一个段落。</p> <ul><li>列表项1</li><li>列表项2</li></ul>`,
    );
  };
  const renderDocument = () => {
    const updateFieldValue = (text: string, type: 'replace' | 'insert') => {
      if (!editingRef || !taskResultData) {
        return;
      }

      const { rowIndex, cellIndex, textAreaRef } = editingRef;
      const textarea = textAreaRef?.resizableTextArea?.textArea;
      const { dataCell } = taskResultData;
      if (!dataCell || !textarea) {
        return;
      }

      let newValue = '';
      if (type === 'replace') {
        newValue = text;
      } else {
        // 获取当前光标位置
        const cursorPosition = textarea.selectionStart;
        const currentValue = textarea.value;

        // 在光标位置插入文字
        newValue =
          currentValue.substring(0, cursorPosition) +
          text +
          currentValue.substring(cursorPosition);
      }
      textarea.value = newValue;
      dataCell[rowIndex][cellIndex].fieldValue = newValue;
    };
    return (
      <div
        className={classNames(
          styles.Document,
          openDocument && styles.DocumentOpen,
        )}
      >
        <PageSmallHeader
          disableBack
          title='查看来源'
          extra={
            <>
              <XInputSearch placeholder='关键词搜索' />
              <LinkButton onClick={() => setOpenDocument(false)}>
                <CloseOutlined />
              </LinkButton>
            </>
          }
        />
        <div className={styles.DocumentBody}>
          <SelectionControl
            renderControls={(text, close) => {
              return (
                <Menu
                  style={{ width: 100 }}
                  onClick={(info) => {
                    close();
                    if (info.key === 'copy') {
                      updateFieldValue(text, 'insert');
                    } else if (info.key === 'replace') {
                      updateFieldValue(text, 'replace');
                    }
                  }}
                  items={[
                    {
                      key: 'copy',
                      label: '复制',
                    },
                    {
                      key: 'replace',
                      label: '替换',
                    },
                  ]}
                />
              );
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: documentContent || '' }}
              className={styles.DocumentContent}
            />
          </SelectionControl>
          <footer>******.pdf</footer>
        </div>
      </div>
    );
  };

  useEffect(() => {
    requestDocumentContent();
  }, []);

  //#endregion

  //#region 数据入库

  const [openDataInsert, setOpenDataInsert] = useState(false);
  const [openDataInsertRecord, setOpenDataInsertRecord] = useState(false);

  const renderDataInsert = () => {
    return (
      <DataInsert
        taskId={taskId}
        open={openDataInsert}
        onCancel={() => setOpenDataInsert(false)}
        onSuccess={() => {
          message.success('数据入库成功');
          setOpenDataInsert(false);
        }}
      />
    );
  };

  const renderDataInsertRecord = () => {
    return (
      <DataInsertRecord
        taskId={taskId}
        open={openDataInsertRecord}
        onCancel={() => setOpenDataInsertRecord(false)}
      />
    );
  };

  //#endregion

  //#region 任务状态

  const [taskProgress, setTaskProgress] = useState<number>();

  const requestTaskStatus = async (taskId: string) => {
    ExtractionTaskApi.getExtractionTaskStatus(taskId).then((data) => {
      setTaskProgress(data);
    });
  };

  useEffect(() => {
    let timerId: any;
    if (
      taskId &&
      taskDetail?.taskStatus &&
      [TaskStatus.Executing, TaskStatus.Failed].includes(taskDetail.taskStatus)
    ) {
      timerId = setInterval(() => {
        requestTaskStatus(taskId);
      }, 5000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [taskId, taskDetail?.taskStatus]);

  //#endregion

  useEffect(() => {
    requestTaskResultData();
  }, [requestTaskResultData]);

  if (!taskDetail) {
    return <XEmpty loading={loadingTaskDetail} />;
  }

  return (
    <div className={classNames(styles.TaskDetail, className)} style={style}>
      {renderListAndResult()}
      {renderDocument()}
      {renderDataInsert()}
      {renderDataInsertRecord()}
    </div>
  );
}
export default React.memo(TaskDetail);
