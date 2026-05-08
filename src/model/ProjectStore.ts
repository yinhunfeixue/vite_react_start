import { APP_NAME, DEFAULT_LANGUAGE } from '@/config/ProjectConfig';
import StoreCreater from '@/preset/tools/StoreCreater';
import StoreUtil from '@/utils/StoreUtil';
import IProjectStore from './interface/IProjectStore';

const storageName = `${APP_NAME}_store`;

const userProjectStore = new StoreCreater<IProjectStore>({
  storageName,
  storageKeyList: ['language', 'theme', 'rememberToken', 'token'],
  sessionKeyList: (state) => (state.rememberToken ? [] : ['token']),
}).create({ language: DEFAULT_LANGUAGE });

const state = userProjectStore.getState();
StoreUtil.assignStore = state.assignStore;
StoreUtil.mergeStore = state.mergeStore;
StoreUtil.updateStore = state.updateStore;
StoreUtil.getStore = state.getStore;
StoreUtil.resetStore = state.resetStore;

export default userProjectStore;
