import React from 'react';

import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{props.children}</div>

      <div className={styles.footer}>
        <p>0x73Da490563C0ccBFd1b86763ccB11B4DaBbCB550</p>
      </div>
    </div>
  );
};

export default Layout;
