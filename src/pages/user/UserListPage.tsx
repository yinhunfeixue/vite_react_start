import useInfiniteScroller from '@/component/infiniteScroller/useInfiniteScroller';
import ProjectUtil from '@/utils/ProjectUtil';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './UserListPage.module.less';

/**
 * UserListPage
 */
function UserListPage() {
  const requestFunction = async (page: number) => {
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
  };
  const scoller = useInfiniteScroller({
    style: { border: '1px solid red', height: 600 },
    requestFunction,
    render: (data) => {
      const { remove, mutate, reload } = scoller.func;
      return (
        <div>
          <Button
            onClick={() => {
              scoller.func.insert({ name: 'new', id: 9999 }, 0);
            }}
          >
            插入
          </Button>
          {data?.list.map((item, index) => {
            return (
              <div
                key={item.id}
                style={{ padding: 8, borderBottom: '1px solid #eee' }}
              >
                {item.name}
                <Button
                  onClick={() => {
                    remove((i) => i === index);
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
    },
  });
  return (
    <div className={classNames(styles.UserListPage)}>
      {scoller.renderScoller()}
    </div>
  );
}
export default UserListPage;
