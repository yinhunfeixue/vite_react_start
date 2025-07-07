import { sql } from '@codemirror/lang-sql';
import CodeMirror from '@uiw/react-codemirror';
import classNames from 'classnames';
import styles from './IndexPage.module.less';

/**
 * IndexPage
 */
function IndexPage() {
  // SQL 语言扩展配置
  const sqlExtension = sql({
    schema: {
      // 定义数据库模式，包含表结构，表名要与 tableNames 数组保持一致
      users: ['id', 'name', 'email', 'created_at', 'updated_at'],
      orders: ['id', 'user_id', 'total_amount', 'status', 'order_date'],
      products: ['id', 'name', 'price', 'category_id', 'description'],
      categories: ['id', 'name', 'parent_id'],
      customers: ['id', 'company_name', 'contact_name', 'phone'],
      inventory: ['id', 'product_id', 'quantity', 'location'],
      suppliers: ['id', 'name', 'contact_info', 'address'],
    },
    // 启用上层作用域补全，这样可以在查询中补全字段
    upperCaseKeywords: true,
    // 启用表和字段的自动补全
    dialect: undefined, // 使用默认方言
  });

  return (
    <div className={classNames(styles.IndexPage)}>
      <CodeMirror
        height='200px'
        extensions={[sqlExtension]}
        placeholder='请输入 SQL 查询语句...'
        basicSetup={{
          autocompletion: true,
          closeBrackets: true,
          highlightSelectionMatches: true,
          searchKeymap: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          rectangularSelection: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
}
export default IndexPage;
