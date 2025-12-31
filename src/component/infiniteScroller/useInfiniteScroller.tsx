import { useInfiniteScroll } from 'ahooks';
import { Data } from 'ahooks/lib/useInfiniteScroll/types';
import classNames from 'classnames';
import React, { CSSProperties, useCallback, useRef } from 'react';
import './useInfiniteScroller.less';

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

  render: (data: IInfiniteScrollerData | undefined) => React.ReactNode;
}

interface IInfiniteScrollerData extends Data {
  page: number;
  total: number;
}

interface IInfiniteScrollerRenderFunc<T> {
  mutate: (data?: IInfiniteScrollerData) => void;
  reload: () => void;
  remove: (equal: (index: number, item: T) => boolean) => void;
  insert: (item: T, index: number) => void;
}

interface IInfiniteScrollerResult<T> {
  renderScoller: () => React.ReactNode;
  data: IInfiniteScrollerData | undefined;
  func: IInfiniteScrollerRenderFunc<T>;
}

/**
 * InfiniteScroller
 *
 * @example
 * ```tsx
const scoller = useInfiniteScroller({
    style: { border: '1px solid red', height: 600 },
    requestFunction,
    render: (data) => <div>...</div>,
})

{scoller.renderScoller()}
 * ```
 */
function useInfiniteScroller<T>(
  props: IInfiniteScrollerProps<T>,
): IInfiniteScrollerResult<T> {
  const {
    className,
    style,
    direction,
    startPage = 1,
    requestFunction,
    render,
  } = props;
  const rootRef = useRef(null);

  const request = useCallback(
    async (currentData: IInfiniteScrollerData | undefined) => {
      const nextPage = currentData ? currentData.page + 1 : startPage;
      const res = await requestFunction(nextPage);
      return {
        ...res,
        page: nextPage,
      };
    },
    [requestFunction, startPage],
  );

  const { data, loading, loadingMore, mutate, reload } =
    useInfiniteScroll<IInfiniteScrollerData>(request, {
      target: rootRef,
      direction,
      threshold: 200,
      isNoMore: (data) => {
        return data ? data.list.length >= data.total : false;
      },
    });

  const remove: IInfiniteScrollerRenderFunc<T>['remove'] = (equal) => {
    if (!data?.list?.length) {
      return;
    }
    const index = data.list.findIndex((item, index) => equal(index, item));
    if (index >= 0) {
      const newData = { ...data };
      newData.list.splice(index, 1);
      newData.total -= 1;
      mutate?.(newData);
    }
  };

  const insert: IInfiniteScrollerRenderFunc<T>['insert'] = (item, index) => {
    const newData = data
      ? { ...data }
      : { list: [], total: 0, page: startPage - 1 };
    newData.list.splice(index, 0, item);
    newData.total += 1;
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

  const renderScoller = () => {
    return (
      <div
        className={classNames('InfiniteScroller', className)}
        style={style}
        ref={rootRef}
      >
        {render(data)}
        {renderFooter()}
      </div>
    );
  };

  return { renderScoller, data, func: { mutate, reload, remove, insert } };
}
export default useInfiniteScroller;
