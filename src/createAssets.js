/**
 * 资源文件自动生成脚本
 * 扫描 assets 目录下的所有图片文件，自动生成 Assets.ts 文件
 * 支持本地资源和网络资源两种模式
 */
import FS from 'fs';
import PATH from 'path';

const DIRNAME = import.meta.dirname;
const assetFold = 'assets';
const ROOT_FOLDER = PATH.join(DIRNAME, assetFold);

/**
 * 支持的图片文件扩展名
 */
const EXT_LIST = ['.jpg', '.png', '.svg', '.gif'];

/**
 * 网络资源服务器地址，为空时使用本地资源
 */
const netAssetsServer = '';

/**
 * 是否为微信小程序环境
 */
const isWx = false;

/**
 * 递归获取指定文件夹下的所有图片文件
 * @param {string} folder - 要扫描的文件夹路径，默认为 assets 目录
 * @returns {string[]} 所有图片文件的绝对路径数组
 */
function getAllFiles(folder = ROOT_FOLDER) {
  const items = FS.readdirSync(folder);
  let result = [];
  for (let item of items) {
    const absPath = PATH.join(folder, item);
    if (FS.statSync(absPath).isDirectory()) {
      result = result.concat(getAllFiles(absPath));
    } else if (EXT_LIST.indexOf(PATH.extname(item)) >= 0) {
      result.push(absPath);
    }
  }
  return result;
}

/**
 * 用于存储生成的代码片段
 */
const code = {
  varList: [], // import 语句列表
  exportList: [], // 导出变量名列表
};
let fileList = getAllFiles();
for (const file of fileList) {
  const relativePath = file.replace(ROOT_FOLDER, '');
  const parse = PATH.parse(relativePath);

  const varName = PATH.join(parse.dir, parse.name)
    .split(PATH.sep)
    .filter((item) => item.length > 0)
    .join('_');

  const varValue = generateAssetRequire(
    relativePath,
    Boolean(netAssetsServer),
    isWx
  );
  const varItem = `import ${varName} from ${varValue};`;
  code.varList.push(varItem);

  code.exportList.push(varName);
}

/**
 * 根据配置生成资源引用路径
 * @param {string} path - 资源相对路径
 * @param {boolean} useNetAssets - 是否使用网络资源
 * @param {boolean} isWx - 是否为微信小程序环境
 * @returns {string} 生成的资源引用代码
 */
function generateAssetRequire(path, useNetAssets = true, isWx = false) {
  const usedPath = path.replace(/[\\/]/g, '/');
  if (useNetAssets) {
    return `getStaticReourceImg('${usedPath}')`;
  }
  if (isWx) {
    return `'/${assetFold}${usedPath}'`;
  }
  return `'./${assetFold}${usedPath}'`;
}

const contentList = [];

contentList.push(`/* eslint-disable */`);
// 资源列表
contentList.push(code.varList.join('\r\n'));

// 用于导出的对象
contentList.push(
  `const Assets = {
  ${code.exportList.join(',\r\n')}
};`
);
// 用于导出的类型
contentList.push(`type AssetsType = typeof Assets`);

contentList.push(`export default Assets;`, `export type { AssetsType };`);

// 如果使用网络资源, 添加网络函数
if (netAssetsServer) {
  contentList.push(`function getStaticReourceImg(assetsPath:string):string{
    const server = '${netAssetsServer}';
    return \`\${server}\${assetsPath}\`
  }`);
}

const fileContent = contentList.join('\r\n\r\n');

FS.writeFileSync(PATH.join(DIRNAME, 'Assets.ts'), fileContent);
