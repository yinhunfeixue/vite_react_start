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
        {selectedMenuKey === 'project-settings' && (
          <div className={styles.contentPage}>
            <h2>项目设置</h2>
            <div className={styles.settingsContainer}>
              <div className={styles.settingSection}>
                <h3>设备类型</h3>
                <div className={styles.deviceTypes}>
                  <div className={styles.deviceOption}>
                    <input
                      type='radio'
                      id='esp32'
                      name='deviceType'
                      value='esp32'
                    />
                    <label htmlFor='esp32'>ESP32</label>
                  </div>
                  <div className={styles.deviceOption}>
                    <input
                      type='radio'
                      id='stm32'
                      name='deviceType'
                      value='stm32'
                    />
                    <label htmlFor='stm32'>STM32</label>
                  </div>
                  <div className={styles.deviceOption}>
                    <input
                      type='radio'
                      id='riscv'
                      name='deviceType'
                      value='riscv'
                    />
                    <label htmlFor='riscv'>RISC-V</label>
                  </div>
                  <div className={styles.deviceOption}>
                    <input
                      type='radio'
                      id='sim'
                      name='deviceType'
                      value='sim'
                      defaultChecked
                    />
                    <label htmlFor='sim'>Simulator</label>
                  </div>
                </div>
              </div>

              <div className={styles.settingSection}>
                <h3>设置 defconfig</h3>
                <div className={styles.defconfigContainer}>
                  <select className={styles.defconfigSelect}>
                    <option value=''>选择 defconfig 文件</option>
                    <option value='sim_defconfig'>sim_defconfig</option>
                    <option value='esp32_defconfig'>esp32_defconfig</option>
                    <option value='stm32_defconfig'>stm32_defconfig</option>
                    <option value='riscv_defconfig'>riscv_defconfig</option>
                  </select>
                  <button className={styles.browseButton}>浏览文件</button>
                </div>
                <p className={styles.settingDesc}>
                  defconfig
                  文件定义了项目的默认配置选项，选择合适的配置文件确保项目能够正确编译和运行。
                </p>
              </div>

              <div className={styles.actionButtons}>
                <button className={styles.saveButton}>保存设置</button>
                <button className={styles.resetButton}>重置为默认</button>
              </div>
            </div>
          </div>
        )}
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
        {selectedMenuKey === 'connect-device' && (
          <div className={styles.contentPage}>
            <h2>连接设备</h2>
            <p>请选择要连接的设备类型，或扫描可用设备...</p>
            <div className={styles.deviceConnection}>
              <p>设备连接状态：未连接</p>
              <button>扫描设备</button>
            </div>
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
