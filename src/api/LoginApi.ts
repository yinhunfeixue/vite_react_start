import StoreUtil from '@/utils/StoreUtil';

/**
 * LoginApi
 */
class LoginApi {
  static logout() {
    StoreUtil.assignStore({ token: undefined });
  }
}
export default LoginApi;
