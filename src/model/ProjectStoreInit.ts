import useProjectStore from '@/model/ProjectStore';
import StoreUtil from '@/utils/StoreUtil';
import React, { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const ProjectStoreInit = () => {
  const { assignStore, mergeStore, updateStore, getStore } = useProjectStore(
    useShallow(({ assignStore, mergeStore, updateStore, getStore }) => {
      return {
        assignStore,
        mergeStore,
        updateStore,
        getStore,
      };
    })
  );

  const initUtil = () => {
    StoreUtil.assignStore = assignStore;
    StoreUtil.mergeStore = mergeStore;
    StoreUtil.updateStore = updateStore;
    StoreUtil.getStore = getStore;
  };

  useEffect(() => {
    initUtil();
  }, []);

  return [];
};

export default React.memo(ProjectStoreInit);
