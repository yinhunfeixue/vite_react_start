import classNames from 'classnames';
import React, { CSSProperties, useState } from 'react';
import styles from './IndexPage.module.less';
import ProjectCreate from './component/ProjectCreate';
import SideMenu from './component/SideMenu';
interface IIndexPageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * IndexPage
 */
function IndexPage(props: IIndexPageProps) {
  const { className, style } = props;
  const [selectedMenuKey, setSelectedMenuKey] = useState('new-project');

  const handleMenuClick = (key: string) => {
    setSelectedMenuKey(key);
    // TODO: 处理菜单点击逻辑
  };

  return (
    <div className={classNames(styles.IndexPage, className)} style={style}>
      <SideMenu onMenuClick={handleMenuClick} />
      <div className={styles.mainContent}>
        {selectedMenuKey === 'new-project' && <ProjectCreate />}
        {selectedMenuKey === 'help' && (
          <div className={styles.contentPage}>
            <h2>帮助</h2>
            <p>这里是帮助内容...</p>
          </div>
        )}
        {selectedMenuKey === 'forum' && (
          <div className={styles.contentPage}>
            <h2>论坛</h2>
            <p>这里是论坛内容...</p>
          </div>
        )}
        {selectedMenuKey.startsWith('device-') && (
          <div className={styles.contentPage}>
            <h2>设备操作</h2>
            <p>当前操作: {selectedMenuKey}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default React.memo(IndexPage);
