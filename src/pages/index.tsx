import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';

import styles from './Landing.module.css';

const Landing = () => {
  const [address, setAddress] = useState<string | undefined>();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Nifty NFT Explorer</h1>

        <div className={styles.search}>
          <input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
            className={styles.input}
          />
          <button
            className={styles.button}
            onClick={() => router.push(`/assets?address=${address}`)}
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
