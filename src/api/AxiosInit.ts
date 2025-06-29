import { SERVER_ROOT } from '@/config/ProjectConfig';
import PageUtil from '@/utils/PageUtil';
import StoreUtil from '@/utils/StoreUtil';
import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * AxiosInit - Axios 网络请求初始化配置类
 */
class AxiosInit {
  /**
   * 初始化 Axios 全局配置
   */
  static init() {
    axios.defaults.baseURL = SERVER_ROOT;
    axios.defaults.withCredentials = false;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.interceptors.response.use(
      AxiosInit.successHandler,
      AxiosInit.errorHandler,
    );
    axios.interceptors.request.use((config) => {
      // 如需添加全局请求头，在这里配置
      const token = StoreUtil.getStore().token;

      if (token) {
        config.headers['dea-token'] = token;
      }
      return config;
    });
  }

  /**
   * 请求响应拦截器
   * 对响应数据进行统一处理，检查业务状态码
   * @param response Axios 响应对象
   * @returns 处理后的响应或被拒绝的 Promise
   */
  static successHandler(response: AxiosResponse) {
    // blob 不处理
    console.log('response', response);

    if (response.config.responseType === 'blob') {
      return response;
    }
    //当出错时，执行全局响应处理，并不再向后执行
    const { code, msg } = response.data;
    if (code !== '0') {
      AxiosInit.showErrorMessage(msg);
      return Promise.reject();
    }

    return response.data;
  }

  /**
   * 全局错误拦截器
   * 处理网络错误和HTTP状态码错误
   * @param error Axios 错误对象
   * @returns 被拒绝的 Promise
   */
  static errorHandler(error: AxiosError) {
    const { message, response } = error;
    if (response) {
      const { status } = response;
      switch (status) {
        case 401:
          PageUtil.openLoginPage(window.location.href);
          break;
        default:
          AxiosInit.showErrorMessage(message, status.toString());
          break;
      }
    } else {
      AxiosInit.showErrorMessage(message);
    }
    return Promise.reject();
  }

  /**
   * 显示错误提示消息
   * @param resMessage 响应错误消息
   * @param status HTTP状态码
   */
  static showErrorMessage(resMessage?: string, status?: string) {
    const message = resMessage || `未知错误： ${status || ''}`;
    notification.error({
      message,
      duration: 3,
    });
  }
}
export default AxiosInit;
