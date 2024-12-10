import IUser from './IUser';

/**
 * 项目 store
 */
export default interface IProjectStore {
  token?: string;
  user?: IUser;

  /**
   * @deprecated
   */
  temp?: string;

  language?: string;

  theme?: string;
}
