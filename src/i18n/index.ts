/**
 * 国际化数据管理
 * 自动扫描并合并所有语言包文件，按语言代码组织翻译数据
 * 文件结构：./语言代码/模块名.json
 */
import ProjectUtil from '@/utils/ProjectUtil';

/**
 * 翻译数据类型定义
 */
type TranslationData = Record<string, string>;
export type LanguageData = Record<string, TranslationData>;

// 使用 import.meta.glob 动态导入所有 JSON 文件
const jsonModules: Record<string, Record<string, string>> = import.meta.glob(
  './**/*.json',
  {
    eager: true,
  },
);

// 存储合并后的翻译对象
const i18nData: LanguageData = {};

Object.keys(jsonModules).forEach((filePath) => {
  // 解析文件路径，获取目录层级
  const directories: string[] = ProjectUtil.getDirectories(filePath);

  // 第一层目录作为语言代码（如 zh-CN, en, fr）
  const languageCode = directories[0];

  if (languageCode) {
    const moduleContent = { ...jsonModules[filePath] };

    delete moduleContent.default;

    // 合并同语言下的所有翻译文件
    i18nData[languageCode] = {
      ...i18nData[languageCode],
      ...moduleContent,
    };
  }
});

export default i18nData;
