import Assets from '@/Assets';
import LinkButton from '@/component/linkButton/LinkButton';
import ListItemWrap2 from '@/component/listItem/listItemWrap2/ListItemWrap2';
import AutoTip from '@/component/normal/autoTip/AutoTip';
import ProjectUtil from '@/utils/ProjectUtil';
import {
  CloseOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Card, GetProp, Input, List, Menu, Space, Tabs, Tag } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import styles from './TaskDetail.module.less';

import PageSmallHeader from '@/component/layout/PageSmallHeader';
import XInputSearch from '@/component/normal/XInputSearch';
import SelectionControl from '@/component/selectionControl/SelectionControl';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
  const renderTaskResult = () => {
    return (
      <div className={styles.TaskResult}>
        <h5 onClick={() => setOpenDocument(true)}>抽取结果</h5>
        <div>最新抽取时间: ****</div>
        <Card title='copy'>
          <Space>
            <Slate
              editor={editor}
              initialValue={initialValue}
              onValueChange={(value) => {
                setSlateValue(value);
              }}
            >
              <Editable
                style={{
                  width: 300,
                  height: 300,
                  border: '1px solid gray',
                  outline: 'none',
                }}
                renderLeaf={(props) => {
                  const { attributes, children } = props;
                  return <span {...attributes}>{children}</span>;
                }}
                renderElement={(props) => {
                  const { attributes, children, element } = props;

                  const { type } = element;

                  switch (type as any) {
                    case 'button':
                      return <span {...attributes}>{children}</span>;
                    case 'docNode':
                      console.log('attributes', attributes, children);

                      return (
                        <span
                          {...attributes}
                          style={{ textDecoration: 'underline' }}
                        >
                          {children}
                        </span>
                      );
                    default:
                      return <p {...attributes}>{children}</p>;
                  }
                }}
              />
            </Slate>

            <SelectionControl
              renderControls={(text, close) => {
                console.log('text', text);
                return (
                  <Menu
                    onClick={(info) => {
                      console.log('info', info);
                      close();
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
              <div>aaaa ejajjgsd;f adsf ds </div>
            </SelectionControl>
            {/* {renderSelectionButton()} */}
            <SyntaxHighlighter
              wrapLines
              wrapLongLines
              language='json'
              customStyle={{
                backgroundColor: 'transparent',
                marginBottom: 0,
                ...style,
              }}
              style={a11yLight}
              showInlineLineNumbers={false}
            >
              {JSON.stringify(slateValue, null, 2)}
            </SyntaxHighlighter>
          </Space>
        </Card>
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
    return (
      <div className={styles.DocumentItem}>
        <img src={Assets.fileIcon_excel} />
        <main>
          <h6>****文档标题</h6>
          <div className='HGroupSpace'>
            <AutoTip content={<time>****2025</time>} />
            <Tag
              color='yellow'
              style={{ backgroundColor: 'transparent', margin: 0 }}
            >
              ***
            </Tag>
          </div>
        </main>
      </div>
    );
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

  //#region slate

  const editor = useMemo(() => {
    const result = withHistory(withReact(createEditor()));
    result.isInline = (element) => {
      return (
        element.type === 'button' || (element.type as string) === 'docNode'
      );
    };
    return result;
  }, []);

  const initialValue: Descendant[] = useMemo(() => {
    return [
      {
        type: 'paragraph',
        children: [
          {
            text: 'init value',
          },
        ],
      },
    ];
  }, []);

  const [slateValue, setSlateValue] = useState<any>(initialValue);

  //#endregion

  useEffect(() => {
    requestTargetTableList();
    requestDocumentList();
  }, []);

  //#region 文档

  const [openDocument, setOpenDocument] = useState(false);
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
      </div>
    );
  };

  //#endregion

  return (
    <div className={classNames(styles.TaskDetail, className)} style={style}>
      {renderListAndResult()}
      {renderDocument()}
    </div>
  );
}
export default React.memo(TaskDetail);
