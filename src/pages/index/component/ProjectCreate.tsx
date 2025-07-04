import {
  BranchesOutlined,
  CheckCircleFilled,
  CheckOutlined,
  CloudDownloadOutlined,
  CodeOutlined,
  CopyOutlined,
  EditOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  LoadingOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ToolOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Input,
  Progress,
  Select,
  Space,
  Steps,
  Tag,
  Typography,
  message,
} from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './ProjectCreate.module.less';

const { Title, Text } = Typography;
const { Step } = Steps;

interface SubStep {
  title: string;
  description?: string;
  status: 'wait' | 'process' | 'finish' | 'error';
  requiresManualAction?: boolean;
  manualActionType?:
    | 'branch-select'
    | 'directory-select'
    | 'project-name'
    | 'open-project';
  command?: string; // 添加命令字段
}

interface MainStep {
  title: string;
  description: string;
  subSteps: SubStep[];
  status: 'wait' | 'process' | 'finish' | 'error';
  icon?: React.ReactNode; // 添加图标字段
}

/**
 * ProjectCreate - OpenVela 应用创建界面
 */
function ProjectCreate() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedDirectory, setSelectedDirectory] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('vela_opensource');
  const [projectNameConfirmed, setProjectNameConfirmed] =
    useState<boolean>(false);
  const [isWaitingForManualAction, setIsWaitingForManualAction] =
    useState(false);

  const steps: MainStep[] = [
    {
      title: '项目设置',
      description: '配置项目相关信息',
      status: 'wait',
      icon: <SettingOutlined />,
      subSteps: [
        {
          title: '选择分支',
          status: 'wait',
          requiresManualAction: true,
          manualActionType: 'branch-select',
        },
        {
          title: '选择工作目录',
          status: 'wait',
          requiresManualAction: true,
          manualActionType: 'directory-select',
        },
        {
          title: '输入项目名称',
          status: 'wait',
          requiresManualAction: true,
          manualActionType: 'project-name',
        },
      ],
    },
    {
      title: '环境检查',
      description: '检查系统环境是否符合要求',
      status: 'wait',
      icon: <SafetyCertificateOutlined />,
      subSteps: [
        {
          title: 'x86 Ubuntu 22.04',
          status: 'wait',
          command: 'check-system-version',
        },
        {
          title: '内存检查（不少于16G）',
          status: 'wait',
          command: 'check-memory-size',
        },
        {
          title: '硬盘检查（不少于80G）',
          status: 'wait',
          command: 'check-disk-space',
        },
      ],
    },
    {
      title: '准备开发环境',
      description: '安装必要的开发工具和依赖',
      status: 'wait',
      icon: <ToolOutlined />,
      subSteps: [
        {
          title: '安装 Repo',
          status: 'wait',
          command: 'install-repo-tool',
        },
        {
          title: '安装 KConfig frontend',
          status: 'wait',
          command: 'install-kconfig-frontend',
        },
        {
          title: '安装 Python',
          status: 'wait',
          command: 'install-python-env',
        },
        {
          title: '安装 Python 包',
          status: 'wait',
          command: 'install-python-packages',
        },
      ],
    },
    {
      title: '下载源码',
      description: '获取项目源代码',
      status: 'wait',
      icon: <CloudDownloadOutlined />,
      subSteps: [
        {
          title: '初始化 Repo 客户端',
          status: 'wait',
          command: 'repo-init --branch main',
        },
        {
          title: '下载源码',
          status: 'wait',
          command: 'repo-sync --all',
        },
      ],
    },
    {
      title: '编译',
      description: '构建项目代码',
      status: 'wait',
      icon: <CodeOutlined />,
      subSteps: [
        {
          title: '构建系统',
          status: 'wait',
          command: 'openvela-build --target sim',
        },
      ],
    },
    {
      title: '运行',
      description: '启动应用程序',
      status: 'wait',
      icon: <PlayCircleOutlined />,
      subSteps: [
        {
          title: '运行 openvela Emulator',
          status: 'wait',
          command: 'openvela-emulator --start',
        },
        {
          title: '运行 lvgldemo',
          status: 'wait',
          command: 'openvela-demo --run lvgl',
        },
      ],
    },
    {
      title: '完成！开启旅程',
      description: '完成创建流程',
      status: 'wait',
      icon: <TrophyOutlined />,
      subSteps: [
        {
          title: '打开项目',
          status: 'wait',
          requiresManualAction: true,
          manualActionType: 'open-project',
        },
      ],
    },
  ];

  const [stepsData, setStepsData] = useState(steps);

  const getStepIcon = (step: MainStep) => {
    // 如果步骤状态为 process，显示加载图标
    if (step.status === 'process') {
      return <LoadingOutlined />;
    }
    // 如果步骤状态为 finish，显示完成图标
    if (step.status === 'finish') {
      return <CheckCircleFilled />;
    }
    // 否则显示步骤的自定义图标
    return step.icon || null;
  };

  const getProgress = () => {
    const totalSteps = stepsData.reduce(
      (acc, step) => acc + step.subSteps.length,
      0,
    );
    const completedSteps = stepsData.reduce((acc, step) => {
      return (
        acc + step.subSteps.filter((sub) => sub.status === 'finish').length
      );
    }, 0);
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const startProcess = () => {
    setIsRunning(true);
    // 模拟执行过程
    simulateProcess();
  };

  const simulateProcess = () => {
    let stepIndex = 0;
    let subStepIndex = 0;

    const executeStep = () => {
      if (stepIndex >= stepsData.length) {
        setIsRunning(false);
        return;
      }

      const newStepsData = [...stepsData];

      if (subStepIndex < newStepsData[stepIndex].subSteps.length) {
        const currentSubStep = newStepsData[stepIndex].subSteps[subStepIndex];

        // 设置当前子步骤为进行中
        currentSubStep.status = 'process';
        newStepsData[stepIndex].status = 'process';
        setStepsData(newStepsData);
        setCurrentStep(stepIndex);
        setCurrentSubStep(subStepIndex);

        // 检查是否需要手动操作
        if (currentSubStep.requiresManualAction) {
          setIsWaitingForManualAction(true);
          // 等待手动操作完成，不自动继续
          return;
        }

        // 模拟执行时间
        setTimeout(() => {
          currentSubStep.status = 'finish';
          setStepsData([...newStepsData]);
          subStepIndex++;
          executeStep();
        }, 1000 + Math.random() * 2000);
      } else {
        // 当前主步骤完成
        newStepsData[stepIndex].status = 'finish';
        setStepsData([...newStepsData]);
        stepIndex++;
        subStepIndex = 0;
        executeStep();
      }
    };

    executeStep();
  };

  // 处理步骤点击切换
  const handleStepClick = (stepIndex: number) => {
    if (isRunning) return; // 运行中不允许切换

    // 只允许切换到已完成的步骤
    if (stepsData[stepIndex].status === 'finish') {
      setCurrentStep(stepIndex);
      setCurrentSubStep(0);
    }
  };

  // 检查步骤是否可点击
  const isStepClickable = (stepIndex: number) => {
    return !isRunning && stepsData[stepIndex].status === 'finish';
  };

  // 处理分支选择
  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
    completeManualAction();
  };

  // 处理目录选择
  const handleDirectorySelect = (directory: string) => {
    setSelectedDirectory(directory);
    completeManualAction();
  };

  // 处理项目名称输入
  const handleProjectNameConfirm = (name: string) => {
    setProjectName(name);
    setProjectNameConfirmed(true);
    completeManualAction();
  };

  // 处理打开项目
  const handleOpenProject = () => {
    message.success('项目已打开！');
    completeManualAction();
  };

  // 复制命令到剪贴板
  const copyCommand = (command: string) => {
    navigator.clipboard
      .writeText(command)
      .then(() => {
        message.success('命令已复制到剪贴板');
      })
      .catch(() => {
        message.error('复制失败，请手动复制命令');
      });
  };

  // 完成手动操作
  const completeManualAction = () => {
    const newStepsData = [...stepsData];
    const currentSubStepData =
      newStepsData[currentStep].subSteps[currentSubStep];

    // 完成当前子步骤
    currentSubStepData.status = 'finish';
    setStepsData([...newStepsData]);
    setIsWaitingForManualAction(false);

    // 继续执行后续步骤
    setTimeout(() => {
      continueProcess();
    }, 500);
  };

  // 继续执行流程
  const continueProcess = () => {
    let stepIndex = currentStep;
    let subStepIndex = currentSubStep + 1;

    const executeStep = () => {
      if (stepIndex >= stepsData.length) {
        setIsRunning(false);
        return;
      }

      const newStepsData = [...stepsData];

      if (subStepIndex < newStepsData[stepIndex].subSteps.length) {
        const currentSubStep = newStepsData[stepIndex].subSteps[subStepIndex];

        // 设置当前子步骤为进行中
        currentSubStep.status = 'process';
        newStepsData[stepIndex].status = 'process';
        setStepsData(newStepsData);
        setCurrentStep(stepIndex);
        setCurrentSubStep(subStepIndex);

        // 检查是否需要手动操作
        if (currentSubStep.requiresManualAction) {
          setIsWaitingForManualAction(true);
          return;
        }

        // 模拟执行时间
        setTimeout(() => {
          currentSubStep.status = 'finish';
          setStepsData([...newStepsData]);
          subStepIndex++;
          executeStep();
        }, 1000 + Math.random() * 2000);
      } else {
        // 当前主步骤完成
        newStepsData[stepIndex].status = 'finish';
        setStepsData([...newStepsData]);
        stepIndex++;
        subStepIndex = 0;
        executeStep();
      }
    };

    executeStep();
  };

  // 获取分支和tag列表
  const getBranchOptions = () => {
    return [
      { label: 'main', value: 'main' },
      { label: 'develop', value: 'develop' },
      { label: 'feature/v1.0', value: 'feature/v1.0' },
      { label: 'release/v1.0.0', value: 'release/v1.0.0' },
      { label: 'tag: v1.0.0', value: 'tag/v1.0.0' },
      { label: 'tag: v0.9.0', value: 'tag/v0.9.0' },
    ];
  };

  // 渲染手动操作组件
  const renderManualAction = (subStep: SubStep) => {
    if (!subStep.requiresManualAction || !isWaitingForManualAction) {
      return null;
    }

    switch (subStep.manualActionType) {
      case 'branch-select':
        return (
          <div className={styles.manualAction}>
            <div className={styles.manualActionTitle}>
              <BranchesOutlined /> 请选择分支或标签
            </div>
            <Select
              placeholder='选择分支或标签'
              style={{ width: '100%', marginTop: 8 }}
              options={getBranchOptions()}
              onSelect={handleBranchSelect}
            />
          </div>
        );
      case 'directory-select':
        return (
          <div className={styles.manualAction}>
            <div className={styles.manualActionTitle}>
              <FolderOutlined /> 目录选择
            </div>
            <div className={styles.directorySelector}>
              <div className={styles.directoryDisplay}>
                <FolderOutlined />
                <span>{selectedDirectory || '点击选择工作目录'}</span>
              </div>
              <Select
                placeholder='选择工作目录'
                style={{ width: '100%', marginTop: 8 }}
                value={selectedDirectory}
                onChange={(value) => setSelectedDirectory(value)}
                options={[
                  { label: '~/workspace', value: '~/workspace' },
                  {
                    label: '~/Documents/projects',
                    value: '~/Documents/projects',
                  },
                  { label: '~/Code', value: '~/Code' },
                  { label: '~/Desktop/openvela', value: '~/Desktop/openvela' },
                  { label: '/opt/workspace', value: '/opt/workspace' },
                  {
                    label: '/usr/local/projects',
                    value: '/usr/local/projects',
                  },
                ]}
              />
              {selectedDirectory && (
                <div style={{ marginTop: 8, textAlign: 'center' }}>
                  <Button
                    type='primary'
                    onClick={() => handleDirectorySelect(selectedDirectory)}
                  >
                    确认选择: {selectedDirectory}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      case 'project-name':
        return (
          <div className={styles.manualAction}>
            <div className={styles.manualActionTitle}>
              <EditOutlined /> 请输入项目名称
            </div>
            <Input
              placeholder='项目名称'
              defaultValue={projectName}
              style={{ width: '100%', marginTop: 8 }}
              onPressEnter={(e) =>
                handleProjectNameConfirm((e.target as HTMLInputElement).value)
              }
              suffix={
                <Button
                  type='link'
                  size='small'
                  onClick={(e) => {
                    const input = e.currentTarget.parentElement
                      ?.previousElementSibling as HTMLInputElement;
                    handleProjectNameConfirm(input?.value || projectName);
                  }}
                >
                  确认
                </Button>
              }
            />
          </div>
        );
      case 'open-project':
        return (
          <div className={styles.manualAction}>
            <div className={styles.manualActionTitle}>
              <FolderOpenOutlined /> 项目已创建完成
            </div>
            <Button
              type='primary'
              icon={<FolderOpenOutlined />}
              onClick={handleOpenProject}
              style={{ marginTop: 8 }}
            >
              打开项目
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classNames(styles.ProjectCreate)}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Title level={2}>OpenVela 应用创建</Title>
              <Button
                type='link'
                icon={<QuestionCircleOutlined />}
                onClick={() =>
                  window.open(
                    'https://github.com/open-vela/docs/blob/trunk/README_zh-cn.md',
                    '_blank',
                  )
                }
                title='查看帮助文档'
                style={{ padding: '0' }}
              >
                帮助文档
              </Button>
            </div>
            <Text type='secondary'>按照以下步骤创建 OpenVela 应用</Text>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.projectInfo}>
              <div className={styles.projectInfoItem}>
                <BranchesOutlined />
                <span>分支: {selectedBranch || '未选择'}</span>
              </div>
              <div className={styles.projectInfoItem}>
                <FolderOutlined />
                <span>目录: {selectedDirectory || '未选择'}</span>
              </div>
              <div className={styles.projectInfoItem}>
                <EditOutlined />
                <span>
                  项目名: {projectNameConfirmed ? projectName : '未设置'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.stepsContainer}>
          <Steps
            current={currentStep}
            direction='vertical'
            size='small'
            className={styles.mainSteps}
          >
            {stepsData.map((step, index) => (
              <Step
                key={index}
                title={
                  <div
                    className={classNames(styles.stepTitle, {
                      [styles.clickable]: isStepClickable(index),
                    })}
                    onClick={() => handleStepClick(index)}
                  >
                    {step.title}
                  </div>
                }
                description={step.description}
                status={step.status}
                icon={getStepIcon(step)}
              />
            ))}
          </Steps>
        </div>

        <div className={styles.detailContainer}>
          <Card
            title={`步骤 ${currentStep + 1}: ${stepsData[currentStep]?.title}`}
            className={styles.detailCard}
          >
            <div className={styles.subSteps}>
              {stepsData[currentStep]?.subSteps.map((subStep, index) => (
                <div key={index}>
                  <div
                    className={classNames(styles.subStep, {
                      [styles.current]:
                        currentStep === currentStep && index === currentSubStep,
                    })}
                  >
                    <div className={styles.subStepIcon}>
                      {subStep.status === 'finish' ? (
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                      ) : subStep.status === 'process' ? (
                        <LoadingOutlined style={{ color: '#1890ff' }} />
                      ) : (
                        <div className={styles.waitIcon} />
                      )}
                    </div>
                    <div className={styles.subStepContent}>
                      <Text strong={subStep.status === 'process'}>
                        {subStep.title}
                      </Text>
                      {subStep.description && (
                        <Text type='secondary' className={styles.subStepDesc}>
                          {subStep.description}
                        </Text>
                      )}
                      {subStep.command && (
                        <div className={styles.commandContainer}>
                          <div className={styles.commandBox}>
                            <code className={styles.commandCode}>
                              {subStep.command}
                            </code>
                            <Button
                              type='text'
                              size='small'
                              icon={<CopyOutlined />}
                              onClick={() => copyCommand(subStep.command!)}
                              className={styles.copyButton}
                              title='复制命令'
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={styles.subStepStatus}>
                      {subStep.status === 'finish' && (
                        <Tag color='success'>完成</Tag>
                      )}
                      {subStep.status === 'process' && (
                        <>
                          {subStep.requiresManualAction &&
                          isWaitingForManualAction &&
                          index === currentSubStep ? (
                            <Tag color='warning'>请操作</Tag>
                          ) : (
                            <Tag color='processing'>进行中</Tag>
                          )}
                        </>
                      )}
                      {subStep.status === 'wait' && (
                        <Tag color='default'>等待</Tag>
                      )}
                    </div>
                  </div>
                  {/* 渲染手动操作组件 */}
                  {subStep.status === 'process' &&
                    index === currentSubStep &&
                    renderManualAction(subStep)}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionContent}>
          <div className={styles.progressContainer}>
            <Progress
              percent={getProgress()}
              status={isRunning ? 'active' : 'normal'}
              strokeColor='#1890ff'
            />
            <Text className={styles.progressText}>
              总进度: {getProgress()}%
            </Text>
          </div>
          <div className={styles.actionButtons}>
            <Space>
              <Button
                type='primary'
                size='large'
                icon={<PlayCircleOutlined />}
                onClick={startProcess}
                disabled={isRunning}
                loading={isRunning}
              >
                {isRunning ? '创建中...' : '开始创建'}
              </Button>
              {getProgress() === 100 && (
                <Button type='default' size='large' icon={<CheckOutlined />}>
                  完成
                </Button>
              )}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCreate;
