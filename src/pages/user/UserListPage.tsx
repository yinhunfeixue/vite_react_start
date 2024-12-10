import userProjectStore from '@/model/ProjectStore';
import classNames from 'classnames';
import styles from './UserListPage.module.less';

/**
 * UserListPage
 */
function UserListPage() {
  const { token } = userProjectStore();
  return (
    <div className={classNames(styles.UserListPage)}>
      {token ? '已登录' : '未登录'}
    </div>
  );
}
export default UserListPage;
