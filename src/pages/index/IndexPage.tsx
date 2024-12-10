import Assets from '@/Assets';
import TestTemp from '@/pages/index/component/TestTemp';
import TestUser from '@/pages/index/component/TestUser';
import IconFont from '@/preset/component/IconFont';
import { Card } from 'antd';
import classNames from 'classnames';
import styles from './IndexPage.module.less';

/**
 * IndexPage
 */
function IndexPage() {
  return (
    <div className={classNames(styles.IndexPage)}>
      <Card title="图片">
        <img src={Assets.react} />
      </Card>
      <Card title="字体图标">
        <div className="HGroup">
          <span>多彩图标：</span>
          <IconFont type="icon-dianpu_" />
          <span>单色图标：</span>
          <IconFont type="e646" useCss />
        </div>
      </Card>
      <Card title="数据仓库">
        <TestUser />
        <TestTemp />
      </Card>
    </div>
  );
}
export default IndexPage;
