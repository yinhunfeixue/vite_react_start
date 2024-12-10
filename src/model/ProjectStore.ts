import { APP_NAME, DEFAULT_LANGUAGE } from '@/config/ProjectConfig';
import StoreCreater from '@/preset/tools/StoreCreater';
import IProjectStore from './interface/IProjectStore';

const storageName = `${APP_NAME}_store`;
const stoargetKeyList: (keyof IProjectStore)[] = ['token', 'language', 'theme'];

const userProjectStore = new StoreCreater<IProjectStore>({
  storageName,
  stoargetKeyList,
}).create({ language: DEFAULT_LANGUAGE });

export default userProjectStore;
