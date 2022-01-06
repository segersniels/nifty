import Button from 'components/Button';
import Layout from 'components/Layout';
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

      router.push(`/assets?address=${accounts.result[0]}`);
    } catch (error) {
      return alert('Unable to authenticate with Metamask Wallet');
    }
  }, [router]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Nifty NFT Explorer</h1>

          <div className={styles.actions}>
            <Search />

            {!!(window as any).ethereum && (
              <>
                <p className={styles.divider}>or</p>
                <Button onClick={loginWithMetamask}>Metamask</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
