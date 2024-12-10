import path from 'path-browserify';

/**
 * ProjectUtil
 */
class ProjectUtil {
  static sleep(time = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * 获取路径中的各级目录
   * @param inputPath - 需要解析的路径
   * @returns 返回路径中的所有一级目录
   */
  static getDirectories(inputPath: string): string[] {
    // 使用 path.normalize 规范化路径
    const normalizedPath: string = path.normalize(inputPath);

    // 按路径分隔符分割路径
    const parts: string[] = normalizedPath.split(path.sep);

    // 过滤掉无效部分，如 '.' 或空字符串
    return parts.filter((part) => part !== '.' && part !== '');
  }
}
export default ProjectUtil;
