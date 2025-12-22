import LoginApi from '@/api/LoginApi';
import UserApi from '@/api/UserApi';
import { APP_NAME, LANGUAGE_LIST, THEME_LIST } from '@/config/ProjectConfig';
import { MENU_LIST } from '@/config/RouteConfig';
import useTheme from '@/hooks/useTheme';
import useProjectStore from '@/model/ProjectStore';
import IRouteItem from '@/preset/config/IRouteItem';
import LocaleUtil from '@/preset/tools/LocaleUtil';
import PageUtil from '@/utils/PageUtil';
import { Button, Select } from 'antd';
import TreeControl from 'fb-project-component/es/utils/TreeControl';
import { match } from 'path-to-regexp';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Outlet, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import styles from './BasicLayout.module.less';
import ProjectMenu from './ProjectMenu';

/**
 * BasicLayout - 基础布局组件
 * 提供应用的主要布局结构，包括侧边菜单、顶部导航栏和主内容区域
 * 负责用户认证状态管理、主题切换、语言切换等全局功能
 */
function BasicLayout() {
  const location = useLocation();

  const getSelectedKeys = (pathname: string) => {
    const currentPath = pathname.substring(1);

    const chain = new TreeControl<IRouteItem>().searchChain(
      MENU_LIST,
      (node) => {
        const matcher = match(node.path);
        if (matcher(currentPath)) {
          return true;
        }
        return false;
      },
    );
    return chain ? chain.map((item) => item.path) : [];
  };

  const defaultMenuData = useMemo(() => {
    return getSelectedKeys(location.pathname);
  }, [location.pathname]);

  const {
    user,
    token,
    assignStore,
    temp,
    language,
    theme: storeTheme,
  } = useProjectStore(
    useShallow(({ user, token, assignStore, temp, language, theme }) => {
      return {
        user,
        token,
        assignStore,
        temp,
        language,
        theme,
      };
    }),
  );

  const [loadingUser, setLoadingUser] = useState(false);
  const [theme, setTheme] = useTheme(storeTheme);

  const requestUser = useCallback(
    (token?: string) => {
      return new Promise<void>((resolve) => {
        if (token) {
          setLoadingUser(true);
          UserApi.getUserInfo()
            .then((user) => {
              assignStore({ user });
            })
            .finally(() => {
              setLoadingUser(false);
              resolve();
            });
        } else {
          assignStore({ user: undefined });
          resolve();
        }
      });
    },
    [assignStore],
  );

  useEffect(() => {
    requestUser(token);
  }, [token, requestUser]);

  const renderHeader = () => {
    return (
      <header>
        <span>{APP_NAME}</span>
        <div className='HGroup'>
          {user ? (
            <>
              <span>temp: {temp || '-'}</span>
              <a>
                <FormattedMessage id='username' />: {user?.nickName}
              </a>
              <Button type='primary'>aa</Button>
              <Button
                danger
                onClick={() => {
                  LoginApi.logout();
                }}
              >
                <FormattedMessage id='logout' />
              </Button>
            </>
          ) : (
            <Button
              loading={loadingUser}
              type='link'
              onClick={() => PageUtil.openLoginPage()}
            >
              登录
            </Button>
          )}
          <Select
            placeholder='主题'
            value={theme}
            style={{ width: 100 }}
            allowClear
            options={THEME_LIST}
            onChange={(value) => {
              assignStore({ theme: value });
              setTheme(value);
            }}
          />
          <Select
            options={Array.from(LANGUAGE_LIST)}
            style={{ width: 200 }}
            value={language}
            onChange={(value) => {
              assignStore({ language: value });
              LocaleUtil.setLocale(value);
            }}
          />
        </div>
      </header>
    );
  };

  const renderSiderBar = () => {
    return (
      <>
        <div className={styles.Logo}>{APP_NAME}</div>
        <ProjectMenu
          defaultOpenKeys={defaultMenuData}
          defaultSelectedKeys={defaultMenuData}
          key={location.pathname}
        />
      </>
    );
  };

  return (
    <div className={styles.BasicLayout}>
      <div className={styles.Left}>{renderSiderBar()}</div>
      <div className={styles.Right}>
        {renderHeader()}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default BasicLayout;
