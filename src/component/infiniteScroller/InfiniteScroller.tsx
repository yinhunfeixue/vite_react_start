import { useInfiniteScroll } from 'ahooks';
import { Data } from 'ahooks/lib/useInfiniteScroll/types';
import classNames from 'classnames';
import React, { CSSProperties, useRef } from 'react';
import './InfiniteScroller.less';

interface IInfiniteScrollerProps<T> {
  className?: string;
  style?: CSSProperties;

  /**
   * 起始页码
   *
   * @default 1
   */
  startPage?: number;

  /**
   * 滚动方向
   *
   * @default 'bottom'
   */
  direction?: 'top' | 'bottom';

  requestFunction: (page: number) => Promise<{ total: number; list: T[] }>;

  render: (
    data: IInfiniteScrollerData | undefined,
    func: {
      mutate: (data: IInfiniteScrollerData) => void;
      reload: () => void;
      remove: (index: number) => void;
    },
  ) => React.ReactNode;
}

interface IInfiniteScrollerData extends Data {
  page: number;
  total: number;
}

/**
 * InfiniteScroller
 *
 * @example
 * ```tsx
 * <InfiniteScroller
 *  style={{ border: '1px solid red', height: 600 }}
 *  requestFunction={async (page) => {
 *    return {
 *      list: [],  // 数据列表
 *      total: 123,
 *    };
 *  }}
 *  render={(data, { mutate, reload }) => {
 *    return (
 *      <div>
 *        <button onClick={() => reload()}>刷新</button>
 *        {data?.list.map((item) => (
 *          <div key={item.id}>{item.name}</div>
 *        ))}
 *      </div>
 *    );
 *  }}
 * />
 * ```
 */
function InfiniteScroller<T>(props: IInfiniteScrollerProps<T>) {
  const {
    className,
    style,
    direction,
    startPage = 1,
    requestFunction,
    render,
  } = props;
  const rootRef = useRef(null);

  const { data, loading, loadingMore, mutate, reload } =
    useInfiniteScroll<IInfiniteScrollerData>(
      async (currentData) => {
        const nextPage = currentData ? currentData.page + 1 : startPage;
        const res = await requestFunction(nextPage);
        return {
          ...res,
          page: nextPage,
        };
      },
      {
        target: rootRef,
        direction,
        threshold: 200,
        isNoMore: (data) => {
          return data ? data.list.length >= data.total : false;
        },
      },
    );

  const remove = (index: number) => {
    if (!data) return;
    const newData = { ...data };
    newData.list.splice(index, 1);
    newData.total -= 1;
    mutate?.(newData);
  };

  const renderFooter = () => {
    if (loading || loadingMore) {
      return <div className='InfiniteScrollerFooter'>加载中...</div>;
    }
    if (data && data.list.length >= data.total) {
      return <div className='InfiniteScrollerFooter'>- 我是有底线的 - </div>;
    }
    return null;
  };

  return (
    <div
      className={classNames('InfiniteScroller', className)}
      style={style}
      ref={rootRef}
    >
      {render(data, { mutate, reload, remove })}
      {renderFooter()}
    </div>
  );
}
export default React.memo(InfiniteScroller);
