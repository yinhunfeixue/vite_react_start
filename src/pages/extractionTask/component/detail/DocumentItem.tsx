import Assets from '@/Assets';
import AutoTip from '@/component/normal/autoTip/AutoTip';
import { Tag } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './DocumentItem.module.less';
interface IDocumentItemProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * DocumentItem
 */
function DocumentItem(props: IDocumentItemProps) {
  const { className, style } = props;
  return (
    <div className={classNames(styles.DocumentItem, className)} style={style}>
      <img src={Assets.fileIcon_excel} />
      <main>
        <h6>****文档标题</h6>
        <div className='HGroupSpace'>
          <AutoTip content={<time>****2025</time>} />
          <Tag
            color='yellow'
            style={{ backgroundColor: 'transparent', margin: 0 }}
          >
            ***
          </Tag>
        </div>
      </main>
    </div>
  );
}
export default React.memo(DocumentItem);
