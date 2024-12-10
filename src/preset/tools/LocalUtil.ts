import { IntlShape } from 'react-intl';

/**
 * LocalUtil
 */
class LocalUtilData {
  static setLocal(_local: string) {}

  static intl: IntlShape;
}

/**
 * 创建动态代理，这样 LocalUtil.intl.*** 可简化成LocalUtil.****
 */
const LocalUtil = new Proxy(LocalUtilData, {
  get(target, property: string) {
    if (target.intl && (target.intl as any)[property]) {
      return (target.intl as any)[property].bind(target.intl);
    }
    return (target as any)[property];
  },
});
export default LocalUtil as typeof LocalUtil & IntlShape;
