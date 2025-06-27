import ExtractionTaskApi from '@/api/ExtractionTaskApi';
import {
  ModalForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React, { CSSProperties, useRef } from 'react';
import IExtractionTask from '../interface/IExtractionTask';

interface ITaskEditProps {
  className?: string;
  style?: CSSProperties;
  trigger: React.ReactElement;
  onSuccess?: () => void;

  /**
   * 目标任务
   * 如果传入了目标任务，则表示编辑任务
   *
   * @default undefined
   */
  target?: IExtractionTask;
}
/**
 * TaskEdit
 */
function TaskEdit(props: ITaskEditProps) {
  const { className, style, trigger, onSuccess, target } = props;
  const formRef = useRef<ProFormInstance>();

  // 是否编辑模式
  const isEditMode = Boolean(target);

  return (
    <ModalForm<IExtractionTask>
      formRef={formRef}
      title={isEditMode ? '编辑任务' : '新增任务'}
      width={480}
      submitter={{
        searchConfig: {
          submitText: isEditMode ? '保存任务' : '创建任务',
        },
      }}
      className={className}
      style={style}
      trigger={trigger}
      layout='vertical'
      autoFocusFirstInput
      initialValues={target}
      onOpenChange={(open) => {
        if (open) {
          formRef.current?.resetFields();
        }
      }}
      onFinish={async (values) => {
        const promise = isEditMode
          ? ExtractionTaskApi.updateExtractionTask({
              ...values,
              taskId: target?.taskId,
            })
          : ExtractionTaskApi.createExtractionTask(values);
        return promise.then((data) => {
          if (data) {
            onSuccess?.();
          }
          return data;
        });
      }}
    >
      <ProFormText
        label='任务名称'
        name='taskName'
        rules={[{ required: true }]}
      />
      <ProFormTextArea label='任务描述' name='taskDescription' />
    </ModalForm>
  );
}
export default React.memo(TaskEdit);
