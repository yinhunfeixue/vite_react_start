# MinRU PDF 文档渲染器

这是一个用于渲染 MinRU (Magic-PDF) 生成的布局文件的 React 组件。

## 功能特性

- 📄 **多页面支持**: 渲染多页 PDF 文档
- 🎨 **类型化渲染**: 根据内容类型（标题、文本、表格、图片等）渲染不同样式
- 📊 **统计信息**: 显示每页的内容统计
- 🎯 **响应式设计**: 适配不同屏幕尺寸
- 🔍 **调试模式**: 可显示块类型标签

## 支持的内容类型

- **title**: 标题
- **text**: 普通文本
- **table**: 表格
- **image**: 图片
- **list**: 列表
- **interline_equation**: 行间公式
- **index**: 索引内容
- **discarded**: 被丢弃的内容

## 使用方法

### 基础用法

```tsx
import { DocumentRenderer } from '@/component/documentRenderer';

const MyComponent = () => {
  const pdfData = {
    // MinRU 生成的布局数据
  };

  return (
    <DocumentRenderer
      data={pdfData}
      showPageNumbers={true}
      showBlockTypes={false}
    />
  );
};
```

### 完整示例

```tsx
import { DocumentRendererExample } from '@/component/documentRenderer';

// 包含文件上传和示例数据的完整示例
const App = () => {
  return <DocumentRendererExample />;
};
```

## Props 属性

### DocumentRenderer

| 属性名          | 类型          | 默认值 | 说明                 |
| --------------- | ------------- | ------ | -------------------- |
| data            | PdfLayoutData | -      | MinRU 生成的布局数据 |
| showPageNumbers | boolean       | true   | 是否显示页码         |
| showBlockTypes  | boolean       | false  | 是否显示块类型标签   |

## 数据格式

组件接受的数据格式遵循 MinRU 的标准输出格式：

```json
{
  "pdf_info": [
    {
      "page_idx": 0,
      "page_size": [595.27, 841.89],
      "para_blocks": [
        {
          "type": "title",
          "bbox": [x1, y1, x2, y2],
          "index": 0,
          "lines": [...]
        }
      ],
      "tables": [...],
      "images": [...],
      "interline_equations": [...]
    }
  ],
  "_parse_type": "txt",
  "_version_name": "1.3.11"
}
```

## 样式定制

可以通过修改 `DocumentRenderer.module.less` 文件来自定义样式：

```less
// 自定义标题样式
.doc-title {
  border-left-color: #your-color;
  background: #your-background;
}

// 自定义文本样式
.doc-text {
  border-left-color: #your-color;
  background: #your-background;
}
```

## 路由配置

组件已配置在路由中，可以通过以下路径访问：

```
/extraction/document-renderer
```

## 文件结构

```
src/component/documentRenderer/
├── DocumentRenderer.tsx           # 主渲染组件
├── DocumentRenderer.module.less   # 样式文件
├── DocumentRendererExample.tsx    # 示例组件
└── index.ts                      # 导出文件
```

## 注意事项

1. 确保传入的数据符合 MinRU 的标准格式
2. 大型文档可能需要考虑虚拟滚动优化
3. 图片和表格目前显示为占位符，可根据需要扩展
4. 支持打印样式，适合文档导出场景

## 扩展建议

1. **虚拟滚动**: 对于大型文档，可以考虑实现虚拟滚动
2. **实际内容**: 可以扩展组件来显示实际的文本内容和图片
3. **导出功能**: 添加 PDF 或图片导出功能
4. **搜索功能**: 在文档中搜索特定内容
5. **缩放功能**: 支持文档缩放查看
