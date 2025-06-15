import Assets from '@/Assets';
import LinkButton from '@/component/linkButton/LinkButton';
import ListItemWrap2 from '@/component/listItem/listItemWrap2/ListItemWrap2';
import AutoTip from '@/component/normal/autoTip/AutoTip';
import ProjectUtil from '@/utils/ProjectUtil';
import { SearchOutlined } from '@ant-design/icons';
import { GetProp, Input, List, Tabs, Tag } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties, useEffect, useState } from 'react';
import styles from './TaskDetail.module.less';
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
        renderItem={(item) => {
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
  //#endregion

  //#region 文档
  const [documentList, setDocumentList] = useState<any[]>();
  const [loadingDocumentList, setLoadingDocumentList] = useState(false);

  const requestDocumentList = async () => {
    setLoadingDocumentList(true);
    await ProjectUtil.sleep();
    const res = [{}, {}];
    setDocumentList(res);
    setLoadingDocumentList(false);
  };

  const renderDocumentItem = (item: any) => {
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
        renderItem={(item) => {
          return <ListItemWrap2>{renderDocumentItem(item)}</ListItemWrap2>;
        }}
      />
    );
  };
  //#endregion

  useEffect(() => {
    requestTargetTableList();
    requestDocumentList();
  }, []);

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

  return (
    <div className={classNames(styles.TaskDetail, className)} style={style}>
      <div className={styles.TabWrap}>
        <Tabs
          activeKey={selectedTabKey}
          onChange={(key) => setSelectedTabKey(key)}
          items={tabItems.map((item) => ({ ...item, children: null }))}
          tabBarExtraContent={<LinkButton type='text'>{'<'} 收起</LinkButton>}
          tabBarStyle={{ paddingLeft: 16, paddingRight: 16 }}
        />
        <Tabs
          activeKey={selectedTabKey}
          items={tabItems}
          renderTabBar={() => <></>}
        />
      </div>
      <main>
        <h5>抽取结果</h5>
        <div>最新抽取时间: ****</div>
      </main>
    </div>
  );
}
export default React.memo(TaskDetail);
