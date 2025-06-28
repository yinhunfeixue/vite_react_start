import AutoTip from '@/component/normal/autoTip/AutoTip';
import FileType from '@/interface/FileType';
import ProjectUtil from '@/utils/ProjectUtil';
import { Tag } from 'antd';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import ExtractorStatus from '../../enum/ExtractorStatus';
import ITaskFile from '../../interface/ITaskFile';
import styles from './DocumentItem.module.less';
interface IDocumentItemProps {
  className?: string;
  style?: CSSProperties;

  data: ITaskFile;
}
/**
 * DocumentItem
 */
function DocumentItem(props: IDocumentItemProps) {
  const { className, style, data } = props;

  const { taskFileName, extractorStatus, uploadTime, taskFileFormat } = data;
  return (
    <div className={classNames(styles.DocumentItem, className)} style={style}>
      <img src={FileType.toIcon(taskFileFormat)} />
      <main>
        <AutoTip content={<h6>{taskFileName}</h6>} />
        <div className='HGroupSpace'>
          <AutoTip
            content={<time>{ProjectUtil.formatDate(uploadTime)}</time>}
          />
          <Tag
            color='yellow'
            style={{ backgroundColor: 'transparent', margin: 0 }}
          >
            {ExtractorStatus.toString(extractorStatus)}
          </Tag>
        </div>
      </main>
    </div>
  );
}
export default React.memo(DocumentItem);
