/* eslint-disable @typescript-eslint/naming-convention */
import Item from 'components/@pages/Assets/Item';
import useRequest from 'hooks/useRequest';
import { useRouter } from 'next/router';
import React from 'react';
import Asset from 'types/Asset';

import styles from './Assets.module.css';

const Assets = () => {
  const router = useRouter();
  const address =
    router.query.address ??
    router.asPath.match(new RegExp(`[&?]address=(.*)(&|$)`))?.[1];

  const { data } = useRequest<{ assets: Asset[] }>(
    `https://api.opensea.io/api/v1/assets?order_direction=asc&owner=${address}`,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Assets</h1>

      <div className={styles.wrapper}>
        {data?.assets.length
          ? data.assets.map((asset) => <Item key={asset.id} asset={asset} />)
          : Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
              <Item key={index} loading />
            ))}
      </div>
    </div>
  );
};

export default Assets;
