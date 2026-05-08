import { StorageValue } from 'zustand/middleware';

export type SessionKeyList<DATA> =
  | (keyof DATA)[]
  | ((state: Partial<DATA>) => (keyof DATA)[]);

/**
 * 创建支持 localStorage / sessionStorage 分发的自定义 storage
 *
 * @param name 存储名称
 * @param sessionKeyList 需要写入 sessionStorage 的字段（支持函数动态判断）
 */
function createDualStorage<DATA>(
  name: string,
  sessionKeyList?: SessionKeyList<DATA>,
) {
  const localKey = name;
  const sessionKey = `${name}_session`;

  return {
    getItem: () => {
      const localRaw = localStorage.getItem(localKey);
      const sessionRaw = sessionStorage.getItem(sessionKey);
      const localData = localRaw ? JSON.parse(localRaw) : null;
      const sessionData = sessionRaw ? JSON.parse(sessionRaw) : null;

      if (!localData && !sessionData) return null;
      if (!sessionData) return localData;
      if (!localData) return sessionData;

      return {
        ...localData,
        state: { ...localData.state, ...sessionData.state },
      };
    },
    setItem: (_: string, value: StorageValue<Partial<DATA>>) => {
      if (!sessionKeyList) {
        localStorage.setItem(localKey, JSON.stringify(value));
        return;
      }

      const state = value.state || {};
      const sessionKeys: (keyof DATA)[] =
        typeof sessionKeyList === 'function'
          ? sessionKeyList(state)
          : sessionKeyList;

      const localState: Record<string, unknown> = {};
      const sessionState: Record<string, unknown> = {};

      for (const [k, v] of Object.entries(state)) {
        if (sessionKeys.includes(k as keyof DATA)) {
          sessionState[k] = v;
        } else {
          localState[k] = v;
        }
      }

      localStorage.setItem(
        localKey,
        JSON.stringify({ ...value, state: localState }),
      );

      if (Object.keys(sessionState).length) {
        sessionStorage.setItem(
          sessionKey,
          JSON.stringify({ ...value, state: sessionState }),
        );
      } else {
        sessionStorage.removeItem(sessionKey);
      }
    },
    removeItem: () => {
      localStorage.removeItem(localKey);
      sessionStorage.removeItem(sessionKey);
    },
  };
}

export default createDualStorage;
