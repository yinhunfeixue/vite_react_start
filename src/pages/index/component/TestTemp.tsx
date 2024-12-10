import useProjectStore from '@/model/ProjectStore';
import { Card, Input } from 'antd';

/**
 * TestTemp
 * @deprecated
 */
function TestTemp() {
  const { temp, assignStore } = useProjectStore();
  return (
    <Card
      title="修改全局 temp"
      extra="修改我，1. 右上信息会变 2. 不会触发 user 卡片渲染"
    >
      <Input
        placeholder="input"
        value={temp}
        onChange={(event) => {
          const value = event.target.value;
          assignStore({ temp: value });
        }}
      />
    </Card>
  );
}
export default TestTemp;
