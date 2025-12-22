import { MessageInstance } from 'antd/es/message/interface';

/**
 * AntdMessage
 */
class AntdMessageUtil {
  static instance: MessageInstance;
}

const antdMessage = new Proxy(AntdMessageUtil, {
  get(target, property: keyof MessageInstance) {
    if (target.instance && property in target.instance) {
      return target.instance[property];
    }
  },
});

export { AntdMessageUtil };
export default antdMessage as unknown as MessageInstance;
