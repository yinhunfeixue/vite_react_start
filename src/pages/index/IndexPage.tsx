import classNames from 'classnames';
import { useState } from 'react';
import styles from './IndexPage.module.less';

/**
 * IndexPage
 */
function IndexPage() {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <div className={classNames(styles.IndexPage)}>
      <header
        className={classNames(styles.Header, showHeader && styles.HeaderShow)}
        onClick={() => {
          setShowHeader(!showHeader);
        }}
      >
        <div>header</div>
      </header>
      <div>tabs</div>
      <main>
        <div>
          <div className={styles.List}>leftContent</div>
        </div>
        <div
          className={styles.ContentWrap}
          onWheel={(event) => {
            const { currentTarget, deltaY } = event;
            const { scrollTop } = currentTarget as HTMLElement;

            const direction = deltaY > 0 ? 'down' : 'up';

            console.log('scrollTop', scrollTop, direction);
            if (direction === 'down') {
              if (showHeader) {
                setShowHeader(false);
              }
            } else {
              if (scrollTop === 0) {
                setShowHeader(true);
              }
            }
          }}
        >
          <div className={styles.Content}>
            {new Array(1000).fill(0).map((_, index) => (
              <div key={index}>{index}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
export default IndexPage;
