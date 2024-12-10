import IProjectStore from '@/model/interface/IProjectStore';
import { IStoreActions } from '@/preset/tools/StoreCreater';
import { PartialDeep } from 'type-fest';

/**
 * StoreUtil
 *
 * 此对象的函数，用于操作Store，会在 StoreInit 中赋值
 */
const StoreUtil: IStoreActions<IProjectStore> = {
  assignStore: (_data: Partial<IProjectStore>) => {},
  mergeStore: (_data: PartialDeep<IProjectStore>) => {},
  updateStore: (_action: (store: IProjectStore) => IProjectStore) => {},
  getStore: () => ({}),
};
export default StoreUtil;
