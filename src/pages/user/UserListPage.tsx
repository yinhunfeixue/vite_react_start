import InfiniteScroller from '@/component/infiniteScroller/InfiniteScroller';
import ProjectUtil from '@/utils/ProjectUtil';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './UserListPage.module.less';

/**
 * UserListPage
 */
function UserListPage() {
  return (
    <div className={classNames(styles.UserListPage)}>
      <InfiniteScroller
        style={{ border: '1px solid red', height: 600 }}
        requestFunction={async (page) => {
          await ProjectUtil.sleep();
          const res = new Array(10).fill(0).map((_, index) => {
            return {
              id: (page - 1) * 10 + index + 1,
              name: `User ${(page - 1) * 10 + index + 1}`,
            };
          });
          return {
            list: res,
            total: 35,
          };
        }}
        render={(data, func) => {
          const { mutate, reload, remove } = func;
          return (
            <div>
              {data?.list.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    style={{ padding: 8, borderBottom: '1px solid #eee' }}
                  >
                    {item.name}
                    <Button
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      删除
                    </Button>
                    <Button
                      onClick={() => {
                        item.name = Math.random();
                        mutate?.({ ...data });
                      }}
                    >
                      修改
                    </Button>
                  </div>
                );
              })}
              <Button onClick={() => reload()}>刷新</Button>
            </div>
          );
        }}
      />
    </div>
  );
}
export default UserListPage;
