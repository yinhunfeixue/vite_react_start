import PlaidApi from '@/api/PlaidApi';
import { Alert, Button } from 'antd';
import { useState } from 'react';

/**
 * AddAccount
 */
function AddAccount() {
  const [linkToken, setLinkToken] = useState();
  const [loadingLinkToken, setLoadingLinkToken] = useState(false);

  const requestLinkToken = async () => {
    setLoadingLinkToken(true);
    PlaidApi.requestLinkToken()
      .then((data) => {
        setLinkToken(data);
      })
      .finally(() => {
        setLoadingLinkToken(false);
      });
  };

  return (
    <div className="VGroup">
      {linkToken && <Alert type="success" message={linkToken} />}
      <Button
        loading={loadingLinkToken}
        type="primary"
        onClick={() => {
          requestLinkToken();
        }}
      >
        添加plaid账号
      </Button>
    </div>
  );
}
export default AddAccount;
