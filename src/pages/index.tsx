import Button from 'components/Button';
import Search from 'components/Search';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import styles from './Landing.module.css';

const Landing = () => {
  const router = useRouter();

  const loginWithMetamask = useCallback(async () => {
    try {
      const accounts = await (window as any).ethereum.send(
        'eth_requestAccounts',
      );

      router.push(`/assets`, {
        query: {
          address: accounts.result[0],
        },
      });
    } catch (error) {
      return alert('Please Install Metamask Wallet');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Nifty NFT Explorer</h1>

        <div className={styles.actions}>
          <Search />

          <p className={styles.divider}>or</p>

          {!!(window as any).ethereum && (
            <Button onClick={loginWithMetamask}>Metamask</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
