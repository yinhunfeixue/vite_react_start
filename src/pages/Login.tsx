import IUser from '@/model/interface/IUser';
import useProjectStore from '@/model/ProjectStore';
import UrlUtil from '@/utils/UrlUtil';
import { Button, Form, Input, message } from 'antd';
import classNames from 'classnames';
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
      <main className='VGroup'>
        <h2>数据抽取系统</h2>
        <div className={classNames(styles.LoginForm)}>
          <h3
            style={{
              textAlign: 'center',
              marginBottom: 40,
              lineHeight: 1,
              fontWeight: 'normal',
            }}
          >
            账号登录
          </h3>
          <Form<IUser>
            layout='vertical'
            autoComplete='off'
            onFinish={() => {
              requestLogin();
            }}
          >
            <FormItem
              name='account'
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                },
              ]}
            >
              <Input size='large' placeholder='请输入账号' />
            </FormItem>
            <FormItem
              // label='密码'
              name='password'
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password size='large' placeholder='请输入密码' />
            </FormItem>
            <FormItem>
              <Button
                loading={loading}
                htmlType='submit'
                type='primary'
                block
                size='large'
                style={{ borderRadius: 50 }}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </main>
    </div>
  );
}

export default Login;
