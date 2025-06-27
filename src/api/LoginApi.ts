import StoreUtil from '@/utils/StoreUtil';
import axios from 'axios';

/**
 * 登录相关 API 工具类
 * 提供登录、登出等用户认证相关的功能
 */
class LoginApi {
  /**
   * 用户登出
   * 清除本地存储的用户 token，实现用户登出功能
   */
  static logout() {
    StoreUtil.assignStore({ token: undefined });
  }

  static login(data: ILoginValue): Promise<void> {
    return axios.post(`/api/auth/login`, data);
  }
}

export interface ILoginValue {
  username: string;
  password: string;
}
export default LoginApi;
