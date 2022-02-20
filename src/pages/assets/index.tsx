/* eslint-disable @typescript-eslint/naming-convention */
import Item from 'components/@pages/Assets/Item';
import Layout from 'components/Layout';
import Search from 'components/Search';
import { Currency, useValueContext } from 'context/ValueContext';
import useOpenSeaData from 'hooks/useAssets';
import { useRouter } from 'next/router';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './Assets.module.css';

interface WorthProps {
  value: number;
  onClick: () => void;
  currency: Currency;
}

const Worth = (props: WorthProps) => {
  const { value, onClick, currency } = props;

  return (
    <h1 className={styles.worth} onClick={onClick}>
      {value ? (
        `${currency === Currency.Ethereum ? 'Ξ' : '$'}${value.toFixed(2)}`
      ) : (
        <Skeleton width="15rem" />
      )}
    </h1>
  );
};

const Assets = () => {
  const router = useRouter();
  const address = (router.query.address ??
    router.asPath.match(new RegExp(`[&?]address=(.*)(&|$)`))?.[1]) as string;
  const { assets, worth } = useOpenSeaData(address);
  const { currency, determineWorth, switchCurrency } = useValueContext();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <Worth
            value={determineWorth(worth)}
            onClick={() => switchCurrency()}
            currency={currency}
          />
          <Search className={styles.search} />
        </div>

        <div className={styles.wrapper}>
          {assets?.length
            ? assets
                .sort(
                  (a, b) =>
                    b.collection.stats.floor_price -
                    a.collection.stats.floor_price,
                )
                .map((asset) => (
                  <Item
                    key={asset.id}
                    asset={asset}
                    collection={asset.collection}
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
