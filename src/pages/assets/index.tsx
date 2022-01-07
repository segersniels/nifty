/* eslint-disable @typescript-eslint/naming-convention */
import Item from 'components/@pages/Assets/Item';
import Layout from 'components/Layout';
import Search from 'components/Search';
import useRequest from 'hooks/useRequest';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

import styles from './Assets.module.css';

const Assets = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [worth, setWorth] = useState(0);
  const address = (router.query.address ??
    router.asPath.match(new RegExp(`[&?]address=(.*)(&|$)`))?.[1]) as string;

  const { data, error } = useRequest<{ assets: Asset[] }>(
    `https://api.opensea.io/api/v1/assets?order_direction=asc&limit=50&owner=${address}`,
    {
      refreshInterval: 10000,
      onSuccess: async (response) => {
        let value = 0;

        if (!response.assets.length) {
          return;
        }

        const slugs = Array.from(
          new Set(response.assets.map((asset) => asset.collection.slug)),
        );

        const amountBySlug = response.assets.reduce((total, asset) => {
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

        const responses = await Promise.all(
          slugs.map(async (slug) => {
            const response = await fetch(
              `https://api.opensea.io/api/v1/collection/${slug}`,
            );
            const { collection }: { collection: Collection } =
              await response.json();

            return collection;
          }),
        );

        setCollections(responses.flat());

        for (const collection of responses) {
          value +=
            amountBySlug[collection.slug] *
            collection.payment_tokens[0].usd_price *
            collection.stats.floor_price;
        }

        setWorth(value);
      },
    },
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1 className={styles.title}>
            {worth ? `$${worth.toFixed(2)}` : <Skeleton width="15rem" />}
          </h1>
          <Search className={styles.search} placeholder={address} />
        </div>

        <div className={styles.wrapper}>
          {data?.assets?.length && !error
            ? data.assets.map((asset) => (
                <Item
                  key={asset.id}
                  asset={asset}
                  collection={collections.find(
                    (c) => c.slug === asset.collection.slug,
                  )}
                />
              ))
            : Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                <Item.Loading key={index} />
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Assets;
