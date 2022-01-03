import Search from 'components/Search';
import React from 'react';

import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Nifty NFT Explorer</h1>

        <Search />
      </div>
    </div>
  );
};

export default Landing;
