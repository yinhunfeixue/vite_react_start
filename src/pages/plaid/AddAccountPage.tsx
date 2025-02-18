import { Card } from 'antd';
import AccountList from './component/AccountList';
import AddAccount from './component/AddAccount';

/**
 * AddAccountPage
 */
function AddAccountPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
      <Card title="添加账号">
        <AddAccount />
      </Card>
      <Card title="账号列表">
        <AccountList />
      </Card>
    </div>
  );
}
export default AddAccountPage;
