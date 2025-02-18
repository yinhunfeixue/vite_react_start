import PlaidApi from '@/api/PlaidApi';
import { Alert, Button } from 'antd';
import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

/**
 * AddAccount
 */
function AddAccount() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
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

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string, metadata: any) => {
      // send public_token to server
      console.log('metadata', metadata);
      PlaidApi.saveAccounts(metadata);
    },
  });

  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready, open]);

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
