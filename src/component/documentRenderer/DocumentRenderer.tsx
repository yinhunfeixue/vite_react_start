import React from 'react';
import './DocumentRenderer.module.less';

// MinRU布局文件的类型定义
export interface PdfBlock {
  type:
    | 'title'
    | 'text'
    | 'table'
    | 'image'
    | 'list'
    | 'interline_equation'
    | 'index'
    | 'discarded';
  bbox: number[];
  lines?: any[];
  blocks?: any[];
  index: number;
  page_num?: string;
  page_size?: number[];
  bbox_fs?: number[];
  lines_deleted?: boolean;
  virtual_lines?: any[];
}

export interface PdfPage {
  preproc_blocks: PdfBlock[];
  layout_bboxes: any[];
  page_idx: number;
  page_size: [number, number];
  _layout_tree: any[];
  images: PdfBlock[];
  tables: PdfBlock[];
  interline_equations: PdfBlock[];
  discarded_blocks: PdfBlock[];
  need_drop: boolean;
  drop_reason: any[];
  para_blocks: PdfBlock[];
}

export interface PdfLayoutData {
  pdf_info: PdfPage[];
  _parse_type: string;
  _version_name: string;
}

export interface DocumentRendererProps {
  data: PdfLayoutData;
  showPageNumbers?: boolean;
  showBlockTypes?: boolean;
}

const DocumentRenderer: React.FC<DocumentRendererProps> = ({
  data,
  showPageNumbers = true,
  showBlockTypes = false,
}) => {
  // 根据内容类型获取CSS类名
  const getBlockClassName = (type: string): string => {
    const baseClass = 'doc-block';
    switch (type) {
      case 'title':
        return `${baseClass} doc-title`;
      case 'text':
        return `${baseClass} doc-text`;
      case 'table':
        return `${baseClass} doc-table`;
      case 'image':
        return `${baseClass} doc-image`;
      case 'list':
        return `${baseClass} doc-list`;
      case 'interline_equation':
        return `${baseClass} doc-equation`;
      case 'index':
        return `${baseClass} doc-index`;
      case 'discarded':
        return `${baseClass} doc-discarded`;
      default:
        return baseClass;
    }
  };

  // 提取块的文本内容
  const extractTextContent = (block: PdfBlock): string => {
    if (!block.lines || block.lines.length === 0) {
      return `[${block.type} - Index: ${block.index}]`;
    }

    return block.lines
      .map((line: any) => {
        if (!line.spans) return '';
        return line.spans.map((span: any) => span.content || '').join('');
      })
      .join('\n');
  };

  // 渲染精细的文字内容 - 按 span 分别渲染
  const renderDetailedText = (block: PdfBlock, blockBbox: number[]) => {
    if (!block.lines || block.lines.length === 0) {
      return (
        <div className='doc-fallback-text'>{`[${block.type} - Index: ${block.index}]`}</div>
      );
    }

    const [blockX1, blockY1] = blockBbox;

    return (
      <div className='doc-detailed-text'>
        {block.lines.map((line: any, lineIndex: number) => {
          if (!line.spans || line.spans.length === 0) {
            return null;
          }

          return (
            <div key={`line-${lineIndex}`} className='doc-text-line'>
              {line.spans.map((span: any, spanIndex: number) => {
                if (!span.content) return null;

                // 计算 span 相对于 block 的位置
                const [spanX1, spanY1, spanX2, spanY2] = span.bbox || [
                  0, 0, 0, 0,
                ];
                const relativeX = spanX1 - blockX1;
                const relativeY = spanY1 - blockY1;
                const spanWidth = spanX2 - spanX1;
                const spanHeight = spanY2 - spanY1;

                const spanStyle: React.CSSProperties = {
                  position: 'absolute',
                  left: `${relativeX}px`,
                  top: `${relativeY}px`,
                  width: `${spanWidth}px`,
                  height: `${spanHeight}px`,
                  lineHeight: `${spanHeight}px`,
                  fontSize: `${Math.max(spanHeight * 0.8, 10)}px`, // 根据高度估算字体大小
                  overflow: 'hidden', // 允许文字超出范围显示
                  whiteSpace: 'nowrap',
                };

                return (
                  <span
                    key={`span-${spanIndex}`}
                    className='doc-text-span'
                    style={spanStyle}
                    title={`Score: ${span.score || 'N/A'}`}
                  >
                    {span.content}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染表格的详细内容 - 处理 blocks 结构
  const renderTableContent = (block: PdfBlock, blockBbox: number[]) => {
    if (!block.blocks || block.blocks.length === 0) {
      return renderDetailedText(block, blockBbox); // 回退到普通文字渲染
    }

    const [blockX1, blockY1] = blockBbox;

    return (
      <div className='doc-detailed-table'>
        {block.blocks.map((subBlock: any, subBlockIndex: number) => {
          if (!subBlock.lines || subBlock.lines.length === 0) {
            return null;
          }

          return (
            <div
              key={`sub-block-${subBlockIndex}`}
              className='doc-table-sub-block'
            >
              {subBlock.lines.map((line: any, lineIndex: number) => {
                if (!line.spans || line.spans.length === 0) {
                  return null;
                }

                return (
                  <div key={`line-${lineIndex}`} className='doc-text-line'>
                    {line.spans.map((span: any, spanIndex: number) => {
                      if (!span.content && span.type !== 'table') return null;

                      // 计算 span 相对于 block 的位置
                      const [spanX1, spanY1, spanX2, spanY2] = span.bbox || [
                        0, 0, 0, 0,
                      ];
                      const relativeX = spanX1 - blockX1;
                      const relativeY = spanY1 - blockY1;
                      const spanWidth = spanX2 - spanX1;
                      const spanHeight = spanY2 - spanY1;

                      const spanStyle: React.CSSProperties = {
                        position: 'absolute',
                        left: `${relativeX}px`,
                        top: `${relativeY}px`,
                        minWidth: `${spanWidth}px`,
                        minHeight: `${spanHeight}px`,
                        lineHeight: `${spanHeight}px`,
                        fontSize: `${Math.max(spanHeight * 0.8, 10)}px`,
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                      };

                      // 如果是表格类型的span，显示HTML内容或特殊处理
                      if (span.type === 'table') {
                        return (
                          <div
                            key={`table-span-${spanIndex}`}
                            className='doc-table-span'
                            style={spanStyle}
                            title={`Table HTML: ${
                              span.html || 'N/A'
                            } | Score: ${span.score || 'N/A'}`}
                          >
                            Table
                          </div>
                        );
                      }

                      return (
                        <span
                          key={`span-${spanIndex}`}
                          className='doc-text-span'
                          style={spanStyle}
                          title={`Score: ${span.score || 'N/A'}`}
                        >
                          {span.content}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染单个内容块
  const renderBlock = (block: PdfBlock, blockIndex: number) => {
    const className = getBlockClassName(block.type);
    const textContent = extractTextContent(block);

    // 计算位置 - bbox格式: [x1, y1, x2, y2]
    const [x1, y1, x2, y2] = block.bbox;
    const blockStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${x1}px`,
      top: `${y1}px`,
      width: `${x2 - x1}px`,
      height: `${y2 - y1}px`,
      zIndex: block.index,
    };

    return (
      <div
        key={`block-${block.index}-${blockIndex}`}
        className={className}
        data-block-type={block.type}
        data-block-index={block.index}
        style={blockStyle}
      >
        {showBlockTypes && (
          <span className='doc-block-type-label'>{block.type}</span>
        )}{' '}
        {/* 根据不同类型渲染不同内容 */}
        {block.type === 'title' && (
          <div className='doc-title-content'>
            {renderDetailedText(block, [x1, y1, x2, y2])}
          </div>
        )}
        {block.type === 'text' && (
          <div className='doc-text-content'>
            {renderDetailedText(block, [x1, y1, x2, y2])}
            {block.lines_deleted && (
              <span className='doc-deleted-note'> [行内容已删除]</span>
            )}
          </div>
        )}{' '}
        {block.type === 'table' && (
          <div className='doc-table-content'>
            {renderTableContent(block, [x1, y1, x2, y2])}
            {(!block.lines || block.lines.length === 0) &&
              (!block.blocks || block.blocks.length === 0) && (
                <div className='doc-table-placeholder'>表格</div>
              )}
          </div>
        )}{' '}
        {block.type === 'image' && (
          <div className='doc-image-content'>
            {renderDetailedText(block, [x1, y1, x2, y2])}
            {(!block.lines || block.lines.length === 0) && (
              <div className='doc-image-placeholder'>🖼️ 图片</div>
            )}
          </div>
        )}{' '}
        {block.type === 'list' && (
          <div className='doc-list-content'>
            {renderDetailedText(block, [x1, y1, x2, y2])}
          </div>
        )}{' '}
        {block.type === 'interline_equation' && (
          <div className='doc-equation-content'>
            {renderDetailedText(block, [x1, y1, x2, y2])}
            {(!block.lines || block.lines.length === 0) && (
              <div className='doc-equation-placeholder'>∫ 公式</div>
            )}
          </div>
        )}
        {block.type === 'index' && (
          <div className='doc-index-content'>
            {renderDetailedText(block, [x1, y1, x2, y2])}
          </div>
        )}
        {block.type === 'discarded' && (
          <div className='doc-discarded-content'>
            🗑️ {textContent || '已丢弃内容'}
          </div>
        )}
      </div>
    );
  };

  // 渲染单个页面
  const renderPage = (page: PdfPage) => {
    const [width, height] = page.page_size;

    return (
      <div
        key={`page-${page.page_idx}`}
        className='doc-page'
        style={
          {
            '--page-width': `${width}px`,
            '--page-height': `${height}px`,
          } as React.CSSProperties
        }
      >
        {showPageNumbers && (
          <div className='doc-page-header'>
            <span className='doc-page-number'>第 {page.page_idx + 1} 页</span>
            <span className='doc-page-size'>
              ({width} × {height})
            </span>
          </div>
        )}{' '}
        <div
          className='doc-page-content'
          style={{
            position: 'relative',
            width: `${width}px`,
            height: `${height}px`,
            margin: '0 auto',
            overflow: 'visible', // 允许内容超出页面边界显示
            border: '1px solid #e8e8e8',
            background: '#ffffff',
          }}
        >
          {' '}
          {/* 渲染段落块 - 使用绝对定位 */}
          {page.para_blocks
            .filter((block) => block.type !== 'discarded') // 过滤掉丢弃的内容
            .map((block, blockIndex) => renderBlock(block, blockIndex))}
          {/* 渲染独立的表格块 */}
          {page.tables
            .filter((table) => table.type !== 'discarded')
            .map((table, tableIndex) =>
              renderBlock(table, tableIndex + page.para_blocks.length),
            )}
        </div>
        {/* 页面统计信息 */}
        <div className='doc-page-stats'>
          <span>
            文本: {page.para_blocks.filter((b) => b.type === 'text').length}
          </span>
          <span>
            标题: {page.para_blocks.filter((b) => b.type === 'title').length}
          </span>
          <span>表格: {page.tables.length}</span>
          <span>图片: {page.images.length}</span>
          <span>公式: {page.interline_equations.length}</span>
        </div>
      </div>
    );
  };

  return (
    <div className='document-renderer'>
      <div className='doc-header'>
        <h1>PDF文档渲染器</h1>
        <div className='doc-info'>
          <span>解析类型: {data._parse_type}</span>
          <span>MinRU版本: {data._version_name}</span>
          <span>总页数: {data.pdf_info.length}</span>
        </div>
      </div>

      <div className='doc-pages'>
        {data.pdf_info.map((page) => renderPage(page))}
      </div>
    </div>
  );
};

export default DocumentRenderer;
