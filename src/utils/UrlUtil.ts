import { NavigateFunction, NavigateOptions } from 'react-router-dom';

/**
 * @class UrlUtil
 * @description 工具类，用于封装路由导航和 URL 生成的功能。
 */
class UrlUtil {
  /**
   * 存储 `useNavigate` 返回的导航函数实例。
   * 需要在应用初始化时将 `useNavigate` 的实例赋值给该属性，以便在全局范围内调用。
   */
  static native: NavigateFunction;

  /**
   * 路由跳转并携带可选的查询参数和导航选项。
   * 推荐在需要统一管理路由行为时使用，如导航到某个页面并附加额外参数。
   * @param pathname 目标路径（支持相对或绝对路径）。
   * @param option 导航选项，支持附带查询参数 `query`、替换历史记录 `replace` 和附加路由状态 `state`。
   * @example
   * // 跳转到 /dashboard，并附带查询参数
   * UrlUtil.toUrl('/dashboard', { query: { userId: 123 }, replace: true });
   */
  static toUrl(
    pathname: string,
    option?: NavigateOptions & {
      query?: Record<string, any>;
    }
  ) {
    const { query, ...otherOption } = option || {};
    UrlUtil.native(
      {
        pathname,
        search: new URLSearchParams(query).toString(),
      },
      otherOption
    );
  }

  /**
   * 生成完整的 URL 字符串，但不会触发跳转。
   * 推荐在需要动态生成链接、分享 URL 或预览导航时使用。
   * @param pathname 基础路径。
   * @param query 可选的查询参数，将自动序列化为查询字符串。
   * @example  UrlUtil.getUrl('/profile', { userId: 123 });
   */
  static getUrl(pathname: string, query?: Record<string, any>) {
    const urlParams = new URLSearchParams(query).toString();
    return `${pathname}?${urlParams}`;
  }
}

export default UrlUtil;
