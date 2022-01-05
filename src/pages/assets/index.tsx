/* eslint-disable @typescript-eslint/naming-convention */
import Item from 'components/@pages/Assets/Item';
import Search from 'components/Search';
import useRequest from 'hooks/useRequest';
import { useRouter } from 'next/router';
import React from 'react';
import Asset from 'types/Asset';

import styles from './Assets.module.css';

const Assets = () => {
  const router = useRouter();
  const address = (router.query.address ??
    router.asPath.match(new RegExp(`[&?]address=(.*)(&|$)`))?.[1]) as string;

  const { data, error, isValidating } = useRequest<{ assets: Asset[] }>(
    `https://api.opensea.io/api/v1/assets?order_direction=asc&limit=50&owner=${address}`,
    {
      refreshInterval: 60,
    },
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>Assets</h1>
        <Search className={styles.search} placeholder={address} />
      </div>

      <div className={styles.wrapper}>
        {data?.assets?.length && !error && !isValidating
          ? data.assets.map((asset) => <Item key={asset.id} asset={asset} />)
          : Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
              <Item key={index} loading />
            ))}
      </div>
    </div>
  );
};

export default Assets;
