import LoginApi, { ILoginValue } from '@/api/LoginApi';
import Assets from '@/Assets';
import { APP_NAME } from '@/config/ProjectConfig';
import useProjectStore from '@/model/ProjectStore';
import ProjectUtil from '@/utils/ProjectUtil';
import UrlUtil from '@/utils/UrlUtil';
import { Button, Form, Input } from 'antd';
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

  const requestLogin = (value: ILoginValue) => {
    setLoading(true);
    LoginApi.login({
      ...value,
      password: ProjectUtil.md5(value.password),
    })
      .then(() => {
        setLoading(false);
        if (query?.back) {
          window.location.href = decodeURIComponent(query.back as string);
        } else {
          UrlUtil.toUrl('/');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.Login}>
      <main className='VGroup'>
        <header className='HGroup'>
          <img src={Assets.logo} />
          <h2>{APP_NAME}</h2>
        </header>

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
          <Form<ILoginValue>
            layout='vertical'
            autoComplete='off'
            onFinish={(value) => {
              requestLogin(value);
            }}
          >
            <FormItem
              name='username'
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
