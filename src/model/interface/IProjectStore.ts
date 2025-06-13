import IUser from './IUser';

/**
 * IProjectStore - 项目全局状态接口
 * 定义应用的全局状态数据结构，包括用户信息、主题、语言等
 */
export default interface IProjectStore {
  /**
   * 用户认证令牌
   */
  token?: string;

  /**
   * 当前登录用户信息
   */
  user?: IUser;

  /**
   * 临时数据字段
   * @deprecated 此字段已废弃，请使用其他方式存储临时数据
   */
  temp?: string;

  /**
   * 当前应用语言设置
   * @example 'zh-CN' | 'en'
   */
  language?: string;

  /**
   * 当前应用主题设置
   * @example 'red' | 'blue'
   */
  theme?: string;
}
