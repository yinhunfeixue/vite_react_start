import { Component } from 'react';
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ICodeProps {
  className?: string;
  style?: React.CSSProperties;
  code: string;

  /**
   * 代码语言，默认sql
   * @see https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/HEAD/AVAILABLE_LANGUAGES_HLJS.MD
   */
  language?: string;

  highlighterProps?: Partial<SyntaxHighlighterProps>;
}

/**
 * 代码组件
 *
 * 用于显示高亮显示代码
 */
class Code extends Component<ICodeProps> {
  render() {
    const { code, language = 'sql', highlighterProps, style } = this.props;
    return (
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        customStyle={{
          backgroundColor: 'transparent',
          marginBottom: 0,
          ...style,
        }}
        language={language}
        style={a11yLight}
        showInlineLineNumbers={false}
        {...highlighterProps}
      >
        {code}
      </SyntaxHighlighter>
    );
  }
}

export default Code;
