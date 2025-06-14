import { useCallback, useEffect, useState } from 'react';

/**
 * 分页请求参数接口
 */
interface PaginationParams {
  /** 当前页码 */
  page: number;
  /** 每页条数 */
  pageSize: number;
  /** 其他查询参数 */
  [key: string]: any;
}

/**
 * 分页请求函数类型
 */
export type PaginationFetcher<T = any> = (
  params: PaginationParams,
) => Promise<PaginationResponse<T>>;

/**
 * 分页响应数据接口
 */
interface PaginationResponse<T = any> {
  /** 数据列表 */
  list: T[];
  /** 总条数 */
  total: number;
}

/**
 * 分页请求结果接口
 */
interface PaginationResult<T = any> {
  /** 数据列表 */
  dataSource: T[];
  /** 总条数 */
  total: number;
  /** 当前页码 */
  currentPage: number;
  /** 每页条数 */
  pageSize: number;
  /** 加载状态 */
  loading: boolean;
  /** 刷新数据 */
  refresh: () => void;
  /** 跳转到指定页 */
  goToPage: (page: number) => void;
}

/**
 * usePagination - 通用分页请求 Hook
 * 提供分页数据获取、状态管理和操作方法
 *
 * @param fetcher 分页请求函数
 * @param params 查询参数 (建议使用 useMemo 包装以避免不必要的重置)
 * @param options 配置选项
 * @returns 分页结果对象
 */
function usePagination<T = any>(
  fetcher: PaginationFetcher<T>,
  options: {
    /**
     * 初始页码
     * @default 1
     */
    page?: number;
    /**
     * 初始每页条数
     * @default 10
     */
    pageSize?: number;
    /**
     * 是否自动加载
     * @default true
     */
    autoLoad?: boolean;
  } = {},
): PaginationResult<T> {
  const { page: defaultPage = 1, pageSize = 10, autoLoad = true } = options;
  // 分页状态
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  /**
   * 执行分页请求
   */
  const fetchData = useCallback(async () => {
    if (!fetcher) {
      return;
    }

    const queryParams = {
      page: currentPage,
      pageSize,
    };
    setLoading(true);
    try {
      const result = await fetcher(queryParams);
      setData(result.list || []);
      setTotal(result.total || 0);
    } catch (error) {
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [fetcher, pageSize, currentPage]);

  /**
   * 刷新当前页数据
   */
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);
  /**
   * 跳转到指定页
   */
  const goToPage = useCallback(
    (targetPage: number) => {
      if (targetPage < 1) return;
      const maxPage = Math.ceil(total / pageSize);
      if (maxPage > 0 && targetPage > maxPage) return;

      setCurrentPage(targetPage);
    },
    [total, pageSize],
  );
  useEffect(() => {
    setCurrentPage(defaultPage);
  }, [fetcher, pageSize, defaultPage]);

  useEffect(() => {
    if (autoLoad) {
      fetchData();
    }
  }, [fetchData, autoLoad]);

  return {
    dataSource: data,
    total,
    currentPage,
    pageSize,
    loading,
    refresh,
    goToPage,
  };
}

export default usePagination;
