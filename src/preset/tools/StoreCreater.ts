import lodash from 'lodash';
import { PartialDeep } from 'type-fest';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IStoreActions<DATA> {
  /**
   * 在第一层级合并 store
   *
   * @see Object.assign
   * @param data
   */
  assignStore: (data: Partial<DATA>) => void;

  /**
   * 深层合并 store
   *
   * @description
   * @see lodash.merge
   * @param data
   */
  mergeStore: (data: PartialDeep<DATA>) => void;

  /**
   * 更新 store
   * 此方法可完全自定义修改 store 的值
   * @param action
   * @returns
   */
  updateStore: (action: (store: Partial<DATA>) => Partial<DATA>) => void;

  getStore: () => Partial<DATA>;
}

/**
 * StoreCreater
 */
class StoreCreater<DATA extends Record<string, any> = Record<string, any>> {
  constructor(
    public readonly option: {
      storageName: string;
      storageKeyList: (keyof DATA)[];
    }
  ) {}

  create(initData?: Partial<DATA>) {
    const { storageName, storageKeyList } = this.option;
    type storeType = IStoreActions<DATA> & Partial<DATA>;

    // 创建 Zustand Store
    const useStore = create(
      persist<storeType>(
        (set) => {
          return {
            ...initData,
            assignStore: (data: Partial<DATA>) =>
              set((state) => ({
                ...state,
                ...data,
              })),
            mergeStore: (data: PartialDeep<DATA>) =>
              set((state) => lodash.merge({}, state, data)),
            updateStore: (action: (store: Partial<DATA>) => Partial<DATA>) =>
              set((state) => action(state)),
            getStore: () => {
              const result = useStore.getState();
              return result as Partial<DATA>;
            },
          } as storeType;
        },
        {
          name: storageName,
          partialize: (state) => {
            // 筛选需要持久化的键
            if (!storageKeyList?.length) {
              return {} as storeType;
            }

            return Object.fromEntries(
              storageKeyList.map((key) => [key, state[key]])
            ) as unknown as storeType;
          },
        }
      )
    );

    return useStore;
  }
}

export default StoreCreater;
