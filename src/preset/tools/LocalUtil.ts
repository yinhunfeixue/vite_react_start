import { IntlShape } from 'react-intl';

/**
 * 国际化工具类
 * 提供语言设置和国际化消息格式化功能
 */
class LocalUtilData {
  /**
   * 设置当前语言环境
   * @param _locale - 语言代码（暂未实现）
   */
  static setLocale(_locale: string) {}

  /**
   * react-intl 实例
   */
  static intl: IntlShape;
}

/**
 * 创建动态代理，简化 API 调用
 * 使 LocalUtil.intl.formatMessage() 可简化为 LocalUtil.formatMessage()
 * 自动将 intl 的方法代理到 LocalUtil 上，提供更简洁的调用方式
 */
const LocalUtil = new Proxy(LocalUtilData, {
  get(target, property: string) {
    if (target.intl && property in target.intl) {
      const method = (target.intl as any)[property];
      return typeof method === 'function' ? method.bind(target.intl) : method;
    }
    return (target as any)[property];
  },
});
export default LocalUtil as typeof LocalUtil & IntlShape;
