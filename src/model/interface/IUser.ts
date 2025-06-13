import { Key } from 'react';

/**
 * IUser - 用户信息接口
 * 定义系统中用户的基本信息结构
 */
export default interface IUser {
  /**
   * 用户唯一标识符
   */
  id: Key;

  /**
   * 用户账号
   */
  account: string;

  /**
   * 用户昵称/显示名称
   */
  nickName: string;
}
