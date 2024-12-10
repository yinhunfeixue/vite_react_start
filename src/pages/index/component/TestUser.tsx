import useProjectStore from '@/model/ProjectStore';
import LocalUtil from '@/preset/tools/LocalUtil';
import StoreUtil from '@/utils/StoreUtil';
import { Card, Input, message } from 'antd';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

/**
 * TestUser
 *
 * @deprecated
 */
function TestUser() {
  const { user } = useProjectStore(
    useShallow((state) => ({ user: state.user }))
  );

  useEffect(() => {
    message.info('user render');
  });

  return (
    <Card title="用户信息" size="small" extra="修改我，页面右上角信息也会变">
      <Input
        placeholder={LocalUtil.formatMessage({ id: 'username' })}
        value={user?.nickName}
        onChange={(event) => {
          const value = event.target.value;
          StoreUtil.mergeStore({ user: { nickName: value } });
        }}
      />
    </Card>
  );
}
export default TestUser;
