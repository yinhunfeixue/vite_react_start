import PlaidApi from '@/api/PlaidApi';
import { Button, Card } from 'antd';
import classNames from 'classnames';
import { CSSProperties, useEffect, useState } from 'react';
interface IAccountListProps {
  className?: string;
  style?: CSSProperties;
}
/**
 * AccountList
 */
function AccountList(props: IAccountListProps) {
  const { className, style } = props;

  const [accountList, setAccountList] = useState<any[]>();

  useEffect(() => {
    requestAccountList();
  }, []);

  const requestAccountList = () => {
    PlaidApi.searchAccountList({}).then((data) => {
      setAccountList(data);
    });
  };

  return (
    <div className={classNames(className)} style={style}>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}
      >
        {accountList?.map((item) => {
          return (
            <Card
              size="small"
              title={item.accountName}
              extra={<Button type="primary">导入订单</Button>}
            >
              {item.accountMask}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default AccountList;
