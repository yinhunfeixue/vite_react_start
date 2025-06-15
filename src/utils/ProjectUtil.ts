import path from 'path-browserify';

/**
 * 项目工具类
 * 提供项目中常用的工具方法，包括异步延迟、路径解析等功能
 */
class ProjectUtil {
  /**
   * 异步延迟函数
   * @param time - 延迟时间，单位毫秒，默认 1000ms
   * @returns Promise 对象，在指定时间后 resolve
   * @example
   * ```typescript
   * await ProjectUtil.sleep(1000); // 延迟 1 秒
   * ```
   */
  static sleep(time: number = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * 获取路径中的各级目录
   * @param inputPath - 需要解析的路径
   * @returns 返回路径中的所有目录层级（按层级顺序）
   * @example
   * ```typescript
   * ProjectUtil.getDirectories('src/pages/user/index.tsx'); // ['src', 'pages', 'user', 'index.tsx']
   * ```
   */
  static getDirectories(inputPath: string): string[] {
    // 使用 path.normalize 规范化路径
    const normalizedPath: string = path.normalize(inputPath);

    // 按路径分隔符分割路径
    const parts: string[] = normalizedPath.split(path.sep);

    // 过滤掉无效部分，如 '.' 或空字符串
    return parts.filter((part) => part !== '.' && part !== '');
  }

  /**
   * 渲染两个名称
   * 如果两个都有值，则格式为 ： 1[2]
   * 否则，只显示有值的名字
   */
  static renderName(name1?: string, name2?: string): string {
    if (name1 && name2) {
      return `${name1}[${name2}]`;
    }
    return name1 || name2 || '';
  }
}
export default ProjectUtil;
