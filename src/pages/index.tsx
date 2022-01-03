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
  );
};

export default Landing;
