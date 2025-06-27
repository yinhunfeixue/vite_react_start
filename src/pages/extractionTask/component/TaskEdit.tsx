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
}
/**
 * TaskEdit
 */
function TaskEdit(props: ITaskEditProps) {
  const { className, style, trigger, onSuccess } = props;
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm<IExtractionTask>
      formRef={formRef}
      title='新增任务'
      width={480}
      submitter={{
        searchConfig: {
          submitText: '创建任务',
        },
      }}
      className={className}
      style={style}
      trigger={trigger}
      layout='vertical'
      autoFocusFirstInput
      onFinish={async (values) => {
        return ExtractionTaskApi.createExtractionTask(values).then((data) => {
          if (data) {
            formRef.current?.resetFields();
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
