import IUser from '@/model/interface/IUser';
import useProjectStore from '@/model/ProjectStore';
import LocaleUtil from '@/preset/tools/LocaleUtil';
import antdMessage from '@/utils/AntdMessage';
import UrlUtil from '@/utils/UrlUtil';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Login.module.less';

const FormItem = Form.Item;

/**
 * 登录页
 */
function Login() {
  const { assignStore } = useProjectStore();

  const [loading, setLoading] = useState(false);
  const [searchParam] = useSearchParams();
  const query = Object.fromEntries(searchParam.entries());

  const requestLogin = () => {
    setLoading(true);
    assignStore({ token: 'login_test_token' });
    antdMessage.success('登录成功').then(() => {
      setLoading(false);
      if (query?.back) {
        window.location.href = decodeURIComponent(query.back as string);
      } else {
        UrlUtil.toUrl('/');
      }
    });
  };

  return (
    <div className={styles.Login}>
      <main>
        <Form<IUser>
          layout='vertical'
          onFinish={() => {
            requestLogin();
          }}
        >
          <FormItem
            label={LocaleUtil.formatMessage({ id: 'username' })}
            name='account'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={LocaleUtil.formatMessage({ id: 'username' })}
              autoComplete='username'
            />
          </FormItem>
          <FormItem
            label={LocaleUtil.formatMessage({ id: 'password' })}
            name='password'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              placeholder={LocaleUtil.formatMessage({ id: 'password' })}
              autoComplete='current-password'
            />
          </FormItem>
          <FormItem>
            <Button
              loading={loading}
              htmlType='submit'
              type='primary'
              block
              size='large'
            >
              {LocaleUtil.formatMessage({ id: 'login' })}
            </Button>
          </FormItem>
        </Form>
      </main>
    </div>
  );
}

export default Login;
