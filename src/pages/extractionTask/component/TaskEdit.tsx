import ProjectUtil from '@/utils/ProjectUtil';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React, { CSSProperties } from 'react';
import IExtractionTask from '../interface/IExtractionTask';

interface ITaskEditProps {
  className?: string;
  style?: CSSProperties;
  trigger: React.ReactNode;
}
/**
 * TaskEdit
 */
function TaskEdit(props: ITaskEditProps) {
  const { className, style, trigger } = props;
  return (
    <ModalForm<IExtractionTask>
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
        await ProjectUtil.sleep();
        console.log('vlaues', values);
        return true;
      }}
    >
      <ProFormText label='任务名称' name='name' rules={[{ required: true }]} />
      <ProFormTextArea label='任务描述' name='desc' />
    </ModalForm>
  );
}
export default React.memo(TaskEdit);
