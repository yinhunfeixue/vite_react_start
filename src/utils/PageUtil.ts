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
   * 打开抽取任务文件管理页
   */
  static openExtractionTaskFileManagePage(taskId: string) {
    UrlUtil.toUrl(`/extraction/fileManage`, { query: { taskId } });
  }

  /**
   * 打开任务详情页
   * @param taskId 任务ID
   */
  static openExtractionTaskDetailPage(taskId: string) {
    UrlUtil.toUrl(`/extraction/detail`, { query: { taskId } });
  }
}
export default PageUtil;
