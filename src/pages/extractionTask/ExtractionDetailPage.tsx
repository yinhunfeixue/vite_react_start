import useUrlParam from '@/hooks/UseUrlParam';
import React, { CSSProperties } from 'react';
import TaskDetail from './component/detail/TaskDetail';
interface IExtractionDetailPageProps {
  className?: string;
  style?: CSSProperties;
}

interface IUrlParams {
  taskId?: string;
}
/**
 * ExtractionDetailPage
 */
function ExtractionDetailPage(props: IExtractionDetailPageProps) {
  const { className, style } = props;
  const [urlParams] = useUrlParam<IUrlParams>();
  const { taskId } = urlParams;

  return <TaskDetail className={className} style={style} taskId={taskId} />;
}
export default React.memo(ExtractionDetailPage);
