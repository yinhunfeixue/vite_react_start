import UrlUtil from '@/utils/UrlUtil';

/**
 * PageUtil - 页面导航工具类
 */
class PageUtil {
  /**
   * 打开登录页面
   * @param back 登录成功后返回的页面地址，默认为当前页面
   */
  static openLoginPage(back: string = window.location.href) {
    UrlUtil.toUrl('/Login', { query: { back: encodeURIComponent(back) } });
  }

  /**
   * 是否是登录页
   */
  static isLoginPage(): boolean {
    const pathname = UrlUtil.location.pathname;
    return pathname === '/Login';
  }
}
export default PageUtil;
