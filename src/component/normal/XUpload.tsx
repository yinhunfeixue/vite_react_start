import AntdUtil from '@/utils/AntdUtil';
import { Upload, UploadProps } from 'antd';

/**
 * XUpload
 */
function XUpload(props: UploadProps) {
  return <Upload {...AntdUtil.uploadDefaultProps} {...props} />;
}
export default XUpload;
