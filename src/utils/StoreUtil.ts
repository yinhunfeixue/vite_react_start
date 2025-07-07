import IProjectStore from '@/model/interface/IProjectStore';
import { IStoreActions } from '@/preset/tools/StoreCreater';

/**
 * StoreUtil - 全局 Store 操作工具
 *
 * 提供在非 React 组件中操作 Zustand store 的能力
 * 这些方法会在 ProjectStoreInit 组件中被实际的 store 方法替换
 *
 * @example
 * ```typescript
 * // 在普通函数中使用
 * StoreUtil.assignStore({ token: 'new-token' });
 * const currentStore = StoreUtil.getStore();
 * ```
 */
const StoreUtil: IStoreActions<IProjectStore> = {
  assignStore: () => {},
  mergeStore: () => {},
  updateStore: () => {},
  getStore: () => {
    return {};
  },
};
export default StoreUtil;
