import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './IndexPage.module.less';
import ProjectCreate from './component/ProjectCreate';
interface IIndexPageProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * IndexPage
 */
function IndexPage(props: IIndexPageProps) {
  const { className, style } = props;
  return (
    <div className={classNames(styles.IndexPage, className)} style={style}>
      <ProjectCreate />
    </div>
  );
}
export default React.memo(IndexPage);
