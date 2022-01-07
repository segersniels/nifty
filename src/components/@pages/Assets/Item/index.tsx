/* eslint-disable @typescript-eslint/naming-convention */
import useRequest from 'hooks/useRequest';
import React, { useCallback } from 'react';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

import styles from './Item.module.css';
import Loading from './Loading';

interface Props {
  asset?: Asset;
  loading?: boolean;
}

const Item = (props: Props) => {
  const { asset, loading = false } = props;

  const { data, isValidating } = useRequest<{ collection: Collection }>(
    `https://api.opensea.io/api/v1/collection/${asset?.collection.slug}`,
    {
      shouldFetch: !loading,
      refreshInterval: 30000,
    },
  );

  const constructName = useCallback(() => {
    let name = asset.name;
    const fallbackName = `${asset.collection.name} #${asset.token_id}`;

    if (!name || name.startsWith('#')) {
      name = fallbackName;
    }

    return name;
  }, [asset?.collection.name, asset?.token_id, asset?.name]);

  if (loading || (isValidating && !data)) {
    return <Loading />;
  }

  return (
    <a
      href={asset.permalink}
      className={styles.container}
      target="_blank"
      rel="noreferrer"
    >
      <img className={styles.image} src={asset.image_url} />

      <div className={styles.top}>
        <p className={styles.price}>
          Ξ{data?.collection?.stats.floor_price ?? 0}
        </p>

        <p className={styles.name}>{constructName()}</p>
      </div>

      <table className={styles.table}>
        <tbody>
          {asset.last_sale?.total_price && (
            <tr className={styles.row}>
              <td className={styles.description}>Purchase Price</td>
              <td className={styles.value}>
                Ξ
                {(asset.last_sale.total_price / 1000000000000000000).toFixed(3)}
              </td>
            </tr>
          )}

          <tr className={styles.row}>
            <td className={styles.description}>Average Price</td>
            <td className={styles.value}>
              Ξ{data?.collection.stats.average_price.toFixed(3) ?? 0}
            </td>
          </tr>

          {!!data?.collection.stats.one_day_average_price && (
            <tr className={styles.row}>
              <td className={styles.description}>1d Average Price</td>
              <td className={styles.value}>
                Ξ{data.collection.stats.one_day_average_price.toFixed(3)}
              </td>
            </tr>
          )}

          {!!data?.collection.stats.seven_day_average_price && (
            <tr className={styles.row}>
              <td className={styles.description}>7d Average Price</td>
              <td className={styles.value}>
                Ξ{data.collection.stats.seven_day_average_price.toFixed(3)}
              </td>
            </tr>
          )}

          {!!data?.collection.stats.one_day_sales && (
            <tr className={styles.row}>
              <td className={styles.description}>Sales (24h)</td>
              <td className={styles.value}>
                {data.collection.stats.one_day_sales}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </a>
  );
};

export default Item;
