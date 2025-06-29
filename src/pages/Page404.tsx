import { Result } from 'antd';
import classNames from 'classnames';
import { CSSProperties } from 'react';

interface IPage404Props {
  className?: string;
  style?: CSSProperties;
}

/**
 * Page404 - 404错误页面
 */
function Page404(props: IPage404Props) {
  const { className, style } = props;
  return (
    <div className={classNames(className)} style={style}>
      <Result status="404" title="404" />
    </div>
  );
}
export default Page404;
