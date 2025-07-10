import IUser from '@/model/interface/IUser';
import useProjectStore from '@/model/ProjectStore';
import LocaleUtil from '@/preset/tools/LocalUtil';
import UrlUtil from '@/utils/UrlUtil';
import { Button, Form, Input, message } from 'antd';
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
    message.success('登录成功').then(() => {
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
            label='帐号'
            name='account'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={LocaleUtil.formatMessage({ id: 'username' })} />
          </FormItem>
          <FormItem
            label='密码'
            name='password'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder='密码' />
          </FormItem>
          <FormItem>
            <Button
              loading={loading}
              htmlType='submit'
              type='primary'
              block
              size='large'
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </main>
    </div>
  );
}

export default Login;
