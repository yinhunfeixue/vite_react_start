import React, { CSSProperties } from 'react';
import TaskDetail from './component/detail/TaskDetail';
interface IExtractionDetailPageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * ExtractionDetailPage
 */
function ExtractionDetailPage(props: IExtractionDetailPageProps) {
  const { className, style } = props;
  return <TaskDetail className={className} style={style} />;
}
export default React.memo(ExtractionDetailPage);
