import useProjectStore from '@/model/ProjectStore';
import StoreUtil from '@/utils/StoreUtil';
import React, { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

/**
 * ProjectStoreInit - 项目 Store 初始化组件
 * 负责将 Zustand store 的方法绑定到全局 StoreUtil 中
 * 使得可以在非 React 组件中使用 store 操作
 */
const ProjectStoreInit: React.FC = () => {
  const { assignStore, mergeStore, updateStore, getStore, resetStore } =
    useProjectStore(
      useShallow(
        ({ assignStore, mergeStore, updateStore, getStore, resetStore }) => {
          return {
            assignStore,
            mergeStore,
            updateStore,
            getStore,
            resetStore,
          };
        },
      ),
    );

  const initUtil = useCallback(() => {
    StoreUtil.assignStore = assignStore;
    StoreUtil.mergeStore = mergeStore;
    StoreUtil.updateStore = updateStore;
    StoreUtil.getStore = getStore;
    StoreUtil.resetStore = resetStore;
  }, [assignStore, mergeStore, updateStore, getStore, resetStore]);

  useEffect(() => {
    initUtil();
  }, [initUtil]);

  return null;
};

export default React.memo(ProjectStoreInit);
