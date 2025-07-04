import { DesktopOutlined, FileOutlined, TagOutlined } from '@ant-design/icons';
import { Cascader, message } from 'antd';
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
  // 项目设置页面的设备类型和defconfig级联选择状态
  const [deviceTypeAndDefconfig, setDeviceTypeAndDefconfig] = useState<
    string[]
  >([]);

  const handleMenuClick = (key: string) => {
    setSelectedMenuKey(key);
    // TODO: 处理菜单点击逻辑
  };

  // 获取产品品类、设备类型和defconfig的级联选项（与ProjectCreate.tsx保持一致）
  const getDeviceDefconfigOptions = () => {
    return [
      {
        label: '物联网设备',
        value: 'iot',
        children: [
          {
            label: 'ESP32',
            value: 'esp32',
            children: [
              { label: 'esp32_defconfig', value: 'esp32_defconfig' },
              {
                label: 'esp32_minimal_defconfig',
                value: 'esp32_minimal_defconfig',
              },
              { label: 'esp32_lvgl_defconfig', value: 'esp32_lvgl_defconfig' },
            ],
          },
        ],
      },
      {
        label: '嵌入式MCU',
        value: 'mcu',
        children: [
          {
            label: 'STM32',
            value: 'stm32',
            children: [
              { label: 'stm32_defconfig', value: 'stm32_defconfig' },
              { label: 'stm32f4_defconfig', value: 'stm32f4_defconfig' },
              { label: 'stm32f7_defconfig', value: 'stm32f7_defconfig' },
            ],
          },
        ],
      },
      {
        label: '开源处理器',
        value: 'opensource',
        children: [
          {
            label: 'RISC-V',
            value: 'riscv',
            children: [
              { label: 'riscv_defconfig', value: 'riscv_defconfig' },
              { label: 'riscv64_defconfig', value: 'riscv64_defconfig' },
              {
                label: 'riscv_minimal_defconfig',
                value: 'riscv_minimal_defconfig',
              },
            ],
          },
        ],
      },
      {
        label: '仿真环境',
        value: 'simulation',
        children: [
          {
            label: 'Simulator',
            value: 'sim',
            children: [
              { label: 'sim_defconfig', value: 'sim_defconfig' },
              { label: 'sim_lvgl_defconfig', value: 'sim_lvgl_defconfig' },
              {
                label: 'sim_minimal_defconfig',
                value: 'sim_minimal_defconfig',
              },
            ],
          },
        ],
      },
    ];
  };

  // 处理产品品类、设备类型和defconfig级联选择
  const handleDeviceDefconfigSelect = (value: string[]) => {
    setDeviceTypeAndDefconfig(value);
    message.success(`已选择 ${value[0]} - ${value[1]} - ${value[2]}`);
  };

  // 处理保存设置
  const handleSaveSettings = () => {
    if (deviceTypeAndDefconfig.length === 3) {
      message.success('设置已保存！');
    } else {
      message.warning('请先选择产品品类、设备类型和defconfig配置！');
    }
  };

  // 处理重置设置
  const handleResetSettings = () => {
    setDeviceTypeAndDefconfig([]);
    message.info('设置已重置为默认值');
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
                <h3>
                  <DesktopOutlined style={{ marginRight: 8 }} />
                  产品品类、设备类型与Defconfig配置
                </h3>
                <div className={styles.cascaderContainer}>
                  <Cascader
                    placeholder='请选择产品品类、设备类型和defconfig配置'
                    style={{ width: '100%' }}
                    options={getDeviceDefconfigOptions()}
                    onChange={handleDeviceDefconfigSelect}
                    value={deviceTypeAndDefconfig}
                    expandTrigger='hover'
                    showSearch={{
                      filter: (inputValue, path) =>
                        path.some((option) =>
                          option.label
                            ?.toLowerCase()
                            .includes(inputValue.toLowerCase()),
                        ),
                    }}
                  />
                </div>
                <p className={styles.settingDesc}>
                  选择产品品类 → 设备类型 →
                  defconfig配置，确保项目正确编译运行。
                </p>
              </div>

              {/* 项目信息显示区域 */}
              {deviceTypeAndDefconfig.length === 3 && (
                <div className={styles.settingSection}>
                  <h3>当前配置信息</h3>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectInfoItem}>
                      <TagOutlined />
                      <span>产品品类: {deviceTypeAndDefconfig[0]}</span>
                    </div>
                    <div className={styles.projectInfoItem}>
                      <DesktopOutlined />
                      <span>设备类型: {deviceTypeAndDefconfig[1]}</span>
                    </div>
                    <div className={styles.projectInfoItem}>
                      <FileOutlined />
                      <span>defconfig: {deviceTypeAndDefconfig[2]}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.actionButtons}>
                <button
                  className={styles.saveButton}
                  onClick={handleSaveSettings}
                >
                  保存设置
                </button>
                <button
                  className={styles.resetButton}
                  onClick={handleResetSettings}
                >
                  重置为默认
                </button>
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
