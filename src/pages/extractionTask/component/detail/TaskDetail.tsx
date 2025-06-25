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
  Space,
  Tabs,
} from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './TaskDetail.module.less';

import Code from '@/component/Code';
import PageSmallHeader from '@/component/layout/PageSmallHeader';
import XEmpty from '@/component/normal/XEmpty';
import XInputSearch from '@/component/normal/XInputSearch';
import SelectionControl from '@/component/selectionControl/SelectionControl';
import ITaskResultTableData from '../../interface/ITaskResultTableData';
import { ISlateNode } from '../resultEditor/IResultNode';
import ResultEditor, { IResultEditorRef } from '../resultEditor/ResultEditor';
import DataInsert from './DataInsert';
import DataInsertRecord from './DataInsertRecord';
import DocumentItem from './DocumentItem';
interface ITaskDetailProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * TaskDetail
 */
function TaskDetail(props: ITaskDetailProps) {
  const { className, style } = props;

  const [selectedTabKey, setSelectedTabKey] = useState<string>();

  //#region 页面状态
  const [openList, setopenList] = useState(true);

  //#endregion

  //#region 抽取结果

  const [taskResultData, setTaskResultData] = useState<ITaskResultTableData>();
  const [loadingTaskResultData, setLoadingTaskResultData] = useState(false);

  const editorRef = useRef<IResultEditorRef>(undefined);

  const [activingEditerRef, setActivingEditerRef] =
    useState<IResultEditorRef>();

  const [tempCode, setTempCode] = useState<ISlateNode[]>();

  // 单元格的ref列表
  const cellRefs = useRef<(IResultEditorRef | null)[][]>([]);

  const requestTaskResultData = async () => {
    setLoadingTaskResultData(true);
    await ProjectUtil.sleep();
    const res: ITaskResultTableData = {
      columns: [{ title: '列1' }, { title: '列2' }],
      dataSource: [
        [
          [
            {
              type: 'p',
              children: [
                { text: '普通文本' },
                {
                  type: 'docNode',
                  children: [{ text: '文档内容1' }],
                  docOption: { from: 'doc', sourceNodeId: '123' },
                },
                {
                  text: ' ',
                },
              ],
            },
          ],
          null,
        ],
      ],
    };
    setTaskResultData(res);
    setLoadingTaskResultData(false);
  };

  const renderResultTable = () => {
    if (!taskResultData) {
      return <XEmpty loading={loadingTaskResultData} />;
    }

    const { columns, dataSource } = taskResultData;
    return (
      <table className={styles.ResultTable}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.title}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const selected =
                  editorRef.current &&
                  editorRef.current === cellRefs.current[rowIndex]?.[cellIndex];

                console.log('selected', selected, rowIndex, cellIndex);

                return (
                  <td key={cellIndex}>
                    <ResultEditor
                      className={styles.ResultEditor}
                      initValue={cell}
                      ref={(ref) => {
                        if (!cellRefs.current[rowIndex]) {
                          cellRefs.current[rowIndex] = [];
                        }
                        cellRefs.current[rowIndex][cellIndex] = ref;
                      }}
                      onDoubleClick={() => {
                        const targetEditor =
                          cellRefs.current[rowIndex][cellIndex];

                        editorRef.current = targetEditor || undefined;

                        setTempCode(targetEditor?.value);
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
    return (
      <div className={styles.TaskResult}>
        <div>
          <h5 onClick={() => setOpenDocument(true)}>抽取结果</h5>
          <div>最新抽取时间: ****</div>
        </div>
        <Alert message='a*****' showIcon />
        {renderResultTable()}
        <Code language='JSON' code={JSON.stringify(tempCode, undefined, 2)} />
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
              <span>****任务名称</span>
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

  //#region 目标表
  const [targetTableList, settargetTableList] = useState<any[]>();
  const [loadingTargetTableList, setLoadingTargetTableList] = useState(false);

  const requestTargetTableList = async () => {
    setLoadingTargetTableList(true);
    await ProjectUtil.sleep();
    const res = [{}, {}];
    settargetTableList(res);
    setLoadingTargetTableList(false);
  };

  const renderTargetTableList = () => {
    return (
      <List
        header={<Input prefix={<SearchOutlined />} placeholder='目标搜索' />}
        loading={loadingTargetTableList}
        dataSource={targetTableList}
        split={false}
        style={{ padding: '4px' }}
        renderItem={() => {
          return (
            <ListItemWrap2>
              <div className='bold' style={{ padding: '8px 12px' }}>
                {ProjectUtil.renderName('aa', 'bb')}
              </div>
            </ListItemWrap2>
          );
        }}
      />
    );
  };

  const [documentList, setDocumentList] = useState<any[]>();
  const [loadingDocumentList, setLoadingDocumentList] = useState(false);

  const requestDocumentList = async () => {
    setLoadingDocumentList(true);
    await ProjectUtil.sleep();
    const res = [{}, {}];
    setDocumentList(res);
    setLoadingDocumentList(false);
  };

  const renderDocumentItem = () => {
    return <DocumentItem />;
  };

  const renderDocumentList = () => {
    return (
      <List
        header={<Input prefix={<SearchOutlined />} placeholder='文档搜索' />}
        loading={loadingDocumentList}
        dataSource={documentList}
        split={false}
        style={{ padding: '4px' }}
        renderItem={() => {
          return <ListItemWrap2>{renderDocumentItem()}</ListItemWrap2>;
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
          onChange={(key) => setSelectedTabKey(key)}
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

  useEffect(() => {
    requestTargetTableList();
    requestDocumentList();
    requestTaskResultData();
  }, []);

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
                      editorRef.current?.insertNodes([
                        {
                          type: 'docNode',
                          children: [{ text }],
                          docOption: {
                            from: 'doc',
                            sourceNodeId: '123',
                          },
                        },
                        {
                          text: ' ',
                        },
                      ]);
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
        open={openDataInsertRecord}
        onCancel={() => setOpenDataInsertRecord(false)}
      />
    );
  };

  //#endregion

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
