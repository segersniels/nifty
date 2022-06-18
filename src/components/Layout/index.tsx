import { useValueContext } from 'context/ValueContext';
import React from 'react';

import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const { price } = useValueContext();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{props.children}</div>

      <div className={styles.footer}>
        <p className={styles.price}>{`$${price}`}</p>
      </div>
    </div>
  );
};

export default Layout;
