import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-redeclare': 0,
      /*****************防止代码无效内容太多*****************/
      //使用console会有警告
      'no-console': 'warn',
      //禁止出现未使用的变量
      '@typescript-eslint/no-unused-vars': 'error',
      //不允许重复import
      'no-duplicate-imports': 'error',
      //强制使用单引号
      quotes: ['off', 'single'],
      //双峰驼命名格式
      camelcase: 'error',
      //大括号风格
      // 'brace-style': ['error', 'stroustrup'],
      //禁止出现重复的 case 标签
      'no-duplicate-case': 'error',

      /********************空格规则***********************/
      //不能用多余的空格
      'no-extra-semi': 'error',
      //缩进用2个空格
      indent: 0,
      //函数定义时,括号前面要不要有空格
      'space-before-function-paren': 0,
      //禁止使用多个空格
      'no-multi-spaces': 'error',
      //es6 箭头符号前后都要有空格
      'arrow-spacing': ['error', { before: true, after: true }],
      //操作符前后必须有空格
      'space-infix-ops': ['error', { int32Hint: false }],
      //逗号前面不允许有空格，后面必须有空格
      'comma-spacing': ['error', { before: false, after: true }],

      /************禁用旧写法*************/
      //不能使用var定义变量
      'no-var': 'error',

      //块级内部前后不添加空行，例如
      //function aaa(){
      //这里不能有空行
      //    let a = 1;
      //这里不能有空行
      //}
      'padded-blocks': ['error', 'never'],
      'no-useless-concat': 'off',
      'react/jsx-key': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-case-declarations': 'off',
    },
  },
);
