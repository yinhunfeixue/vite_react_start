import PageUtil from '@/utils/PageUtil';
import StoreUtil from '@/utils/StoreUtil';
import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

/**
 * AxiosInit
 */
class AxiosInit {
  static init() {
    axios.defaults.baseURL = './';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.interceptors.response.use(
      AxiosInit.successHandler,
      AxiosInit.errorHandler
    );
    axios.interceptors.request.use((config) => {
      // 如需添加全局请求头，在这里配置
      const token = StoreUtil.getStore().token;
      if (token) {
        config.headers.token = token;
      }
      return config;
    });
  }

  /**
   * 请求响应拦截器。
   * 通常，需要对一些消息做全局的错误处理，在此处进行。
   * 处理完成后，如果不希望
   */
  static successHandler(response: AxiosResponse) {
    //当出错时，执行全局响应处理，并不再向后执行
    const { code, message } = response.data;
    if (code !== 200) {
      AxiosInit.showErrorMessage(message);
      return Promise.reject();
    }

    return response;
  }

  /**
   * 全局错误拦截器
   * @param {*} error
   */
  static errorHandler(error: any) {
    const { message, response } = error;
    if (response) {
      const { status } = response;
      switch (status) {
        case 401:
          PageUtil.openLoginPage(window.location.href);
          break;
        default:
          AxiosInit.showErrorMessage(message, status);
          break;
      }
    } else {
      AxiosInit.showErrorMessage(message);
    }
    return Promise.reject();
  }

  static showErrorMessage(resMessage?: string, status?: string) {
    const message = resMessage || `未知错误： ${status || ''}`;
    notification.error({
      message,
      duration: 3,
    });
  }
}
export default AxiosInit;
