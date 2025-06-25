import { FileTextOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message, type UploadProps } from 'antd';
import React, { useState } from 'react';
import DocumentRenderer from './DocumentRenderer';
import exampleData from './example.json';

const DocumentRendererExample: React.FC = () => {
  const [pdfData, setPdfData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 处理文件上传
  const handleFileUpload: UploadProps['customRequest'] = (options) => {
    const { file } = options;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        setPdfData(jsonData);
        message.success('文件加载成功！');
      } catch (error) {
        message.error('JSON文件格式错误，请检查文件内容');
        // eslint-disable-next-line no-console
        console.error('JSON解析错误:', error);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      message.error('文件读取失败');
      setLoading(false);
    };

    reader.readAsText(file as File);
  };
  // 加载示例数据
  const loadSampleData = () => {
    setPdfData(exampleData);
    message.info('已加载示例数据');
  };

  // 清除数据
  const clearData = () => {
    setPdfData(null);
    message.info('已清除数据');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginBottom: '20px',
          padding: '20px',
          background: '#f0f2f5',
          borderRadius: '8px',
        }}
      >
        <h2
          style={{
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileTextOutlined />
          MinRU PDF 布局文件渲染器
        </h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Upload
            customRequest={handleFileUpload}
            showUploadList={false}
            accept='.json'
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              上传 JSON 文件
            </Button>
          </Upload>

          <Button type='primary' onClick={loadSampleData}>
            加载示例数据
          </Button>

          {pdfData && (
            <Button danger onClick={clearData}>
              清除数据
            </Button>
          )}
        </div>

        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
          <p style={{ margin: '4px 0' }}>
            • 支持上传 MinRU 生成的 PDF 中间解析文件 (pdf_middle.json)
          </p>
          <p style={{ margin: '4px 0' }}>
            • 或者点击"加载示例数据"查看渲染效果
          </p>
        </div>
      </div>

      {pdfData ? (
        <DocumentRenderer
          data={pdfData}
          showPageNumbers={true}
          showBlockTypes={true}
        />
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999',
            background: '#fafafa',
            borderRadius: '8px',
            border: '2px dashed #d9d9d9',
          }}
        >
          <FileTextOutlined
            style={{ fontSize: '48px', marginBottom: '16px' }}
          />
          <h3 style={{ margin: '0 0 8px 0', color: '#666' }}>暂无数据</h3>
          <p style={{ margin: 0 }}>请上传 MinRU 布局文件或加载示例数据</p>
        </div>
      )}
    </div>
  );
};

export default DocumentRendererExample;
