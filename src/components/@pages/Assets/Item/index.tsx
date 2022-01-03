/* eslint-disable @typescript-eslint/naming-convention */
import useRequest from 'hooks/useRequest';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Asset from 'types/Asset';

import styles from './Item.module.css';

interface Props {
  asset: Asset;
}

interface Collection {
  stats: {
    floor_price: number;
    average_price: number;
    one_day_average_price: number;
    one_day_sales: number;
    seven_day_average_price: number;
  };
}

const Item = (props: Props) => {
  const { asset } = props;

  const { data } = useRequest<{ collection: Collection }>(
    `https://api.opensea.io/api/v1/collection/${asset.collection.slug}`,
  );

  return (
    <a href={asset.permalink} className={styles.item}>
      {!!data?.collection && (
        <p className={styles.price}>
          Ξ{data.collection.stats.floor_price ?? <Skeleton />}
        </p>
      )}

      <p className={styles.name}>{asset.name ?? <Skeleton />}</p>

      {asset.image_url ? (
        <img className={styles.image} src={asset.image_url} />
      ) : (
        <Skeleton className={styles.image} />
      )}

      <table className={styles.table}>
        {asset.last_sale?.total_price && (
          <tr>
            <td className={styles.description}>Last Sale Price</td>
            <td className={styles.value}>
              Ξ{asset.last_sale.total_price / 1000000000000000000}
            </td>
          </tr>
        )}

        {!!data?.collection.stats.average_price && (
          <tr>
            <td className={styles.description}>Average Price</td>
            <td className={styles.value}>
              Ξ{data.collection.stats.average_price.toFixed(3)}
            </td>
          </tr>
        )}

        {!!data?.collection.stats.one_day_average_price && (
          <tr>
            <td className={styles.description}>1d Average Price</td>
            <td className={styles.value}>
              Ξ{data.collection.stats.one_day_average_price.toFixed(3)}
            </td>
          </tr>
        )}

        {!!data?.collection.stats.seven_day_average_price && (
          <tr>
            <td className={styles.description}>7d Average Price</td>
            <td className={styles.value}>
              Ξ{data.collection.stats.seven_day_average_price.toFixed(3)}
            </td>
          </tr>
        )}

        {!!data?.collection.stats.one_day_sales && (
          <tr>
            <td className={styles.description}>Sales (24h)</td>
            <td className={styles.value}>
              {data.collection.stats.one_day_sales}
            </td>
          </tr>
        )}
      </table>
    </a>
  );
};

export default Item;
