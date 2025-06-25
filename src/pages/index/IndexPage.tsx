import classNames from 'classnames';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './IndexPage.module.less';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
/**
 * IndexPage
 */
function IndexPage() {
  const [total, setTotal] = useState<number>();
  return (
    <div className={classNames(styles.IndexPage)}>
      <Document
        file='a.pdf'
        onLoadSuccess={(document) => {
          setTotal(document.numPages);
        }}
      >
        {total &&
          Array.from({ length: total }, (_, index) => (
            <Page
              customTextRenderer={(props) => {
                console.log(props);
                return `<span id="量之_${props.itemIndex}"  >${props.str}</span>`;
              }}
              key={index + 1}
              pageNumber={index + 1}
              width={800}
            ></Page>
          ))}
      </Document>
    </div>
  );
}
export default IndexPage;
