import ProjectUtil from '@/utils/ProjectUtil';

// 使用 import.meta.glob 动态导入所有 JSON 文件
const jsonModules: Record<string, any> = import.meta.glob('./**/*.json', {
  eager: true,
});

// 存储合并后的翻译对象
const i18nData: Record<string, any> = {};

Object.keys(jsonModules).forEach((filePath) => {
  const directories: string[] = ProjectUtil.getDirectories(filePath);

  const languageCode = directories[0];

  if (languageCode) {
    const moduleContent = { ...jsonModules[filePath] };
    delete moduleContent.default;

    i18nData[languageCode] = {
      ...i18nData[languageCode],
      ...moduleContent,
    };
  }
});

export default i18nData;
