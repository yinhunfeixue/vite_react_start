import IUser from '@/model/interface/IUser';
import ProjectUtil from '@/utils/ProjectUtil';

/**
 * UserApi
 */
class UserApi {
  /**
   * 获取用户信息
   */
  static async getUserInfo(): Promise<IUser> {
    await ProjectUtil.sleep();
    return {
      id: 1,
      account: 'account',
      nickName: '临时用户',
    };
  }
}
export default UserApi;
