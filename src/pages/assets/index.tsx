/* eslint-disable @typescript-eslint/naming-convention */
import Item from 'components/@pages/Assets/Item';
import Layout from 'components/Layout';
import Search from 'components/Search';
import useRequest from 'hooks/useRequest';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

import styles from './Assets.module.css';

const Assets = () => {
  const router = useRouter();
  const [worth, setWorth] = useState(0);
  const address = (router.query.address ??
    router.asPath.match(new RegExp(`[&?]address=(.*)(&|$)`))?.[1]) as string;

  const { data, error } = useRequest<{ assets: Asset[] }>(
    `https://api.opensea.io/api/v1/assets?order_direction=asc&limit=50&owner=${address}`,
    {
      refreshInterval: 60000,
    },
  );

  const fetchWorth = useCallback(async (assets: Asset[]) => {
    let worth = 0;

    if (!assets?.length) {
      return;
    }

    const slugs = Array.from(
      new Set(assets.map((asset) => asset.collection.slug)),
    );
    const amountBySlug = assets.reduce((total, asset) => {
      const slug = asset.collection.slug;

      // Already have the slug so increment
      if (total[slug]) {
        return {
          ...total,
          [slug]: total[slug] + 1,
        };
      }

      return {
        ...total,
        [slug]: 1,
      };
    }, {} as Record<string, number>);

    for (const slug of slugs) {
      const response = await fetch(
        `https://api.opensea.io/api/v1/collection/${slug}`,
      );
      const { collection }: { collection: Collection } = await response.json();

      worth +=
        amountBySlug[slug] *
        collection.payment_tokens[0].usd_price *
        collection.stats.floor_price;
    }

    setWorth(worth);
  }, []);

  useEffect(() => {
    fetchWorth(data?.assets);
  }, [fetchWorth, data?.assets]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1 className={styles.title}>${worth.toFixed(2)}</h1>
          <Search className={styles.search} placeholder={address} />
        </div>

        <div className={styles.wrapper}>
          {data?.assets?.length && !error
            ? data.assets.map((asset) => <Item key={asset.id} asset={asset} />)
            : Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                <Item key={index} loading />
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Assets;
