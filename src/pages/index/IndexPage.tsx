import Assets from '@/Assets';
import TestTemp from '@/pages/index/component/TestTemp';
import TestUser from '@/pages/index/component/TestUser';
import IconFont from '@/preset/component/IconFont';
import { Button, Card, DatePicker } from 'antd';
import classNames from 'classnames';
import exceljs from 'exceljs';
import styles from './IndexPage.module.less';

/**
 * IndexPage
 */
function IndexPage() {
  async function createExcel() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Email', key: 'email', width: 32 },
    ];

    const row = worksheet.addRow([11, 22, 32]);
    row.getCell(1).style = {
      font: {
        bold: true,
        color: { argb: 'FF0000' },
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        // Add fill color
        fgColor: { argb: 'FFFF00' },
      },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myfile.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className={classNames(styles.IndexPage)}>
      <Card
        title='图片'
        extra={<Button onClick={createExcel}>生成excel</Button>}
      >
        <img src={Assets.react} />
      </Card>
      <Card title='字体图标'>
        <div className='HGroup'>
          <span>多彩图标：</span>
          <IconFont type='icon-dianpu_' />
          <span>单色图标：</span>
          <IconFont type='e646' useCss />
        </div>
      </Card>
      <Card title='数据仓库'>
        <TestUser />
        <TestTemp />
        <DatePicker />
      </Card>
    </div>
  );
}
export default IndexPage;
