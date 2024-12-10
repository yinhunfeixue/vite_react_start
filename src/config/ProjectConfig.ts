/**
 * 应用名称
 */
export const APP_NAME = 'APP名称';

/**
 * 应用描述
 */
export const APP_DESC = 'APP描述';

/**
 * 应用 LOGO URL
 */
export const APP_LOGO =
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png';

/**
 * 支持的语言列表
 */
export const LANGUAGE_LIST = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en', label: 'English' },
] as const;

/**
 * 默认语言
 */
export const DEFAULT_LANGUAGE: (typeof LANGUAGE_LIST)[number]['value'] = 'en';

/**
 * 支持的主题列表
 */
export const THEME_LIST = [
  { value: 'red', label: '红色主题' },
  { value: 'blue', label: '蓝色主题' },
];
