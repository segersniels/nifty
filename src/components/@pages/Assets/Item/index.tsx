import React, { useCallback } from 'react';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

import styles from './Item.module.css';
import Loading from './Loading';

interface Props {
  asset: Asset;
  collection: Collection;
}

const Item = (props: Props) => {
  const { asset, collection } = props;

  const constructName = useCallback(() => {
    let name = asset.name;
    const fallbackName = `${asset.collection.name} #${asset.token_id}`;

    if (!name || name.startsWith('#')) {
      name = fallbackName;
    }

    return name;
  }, [asset?.collection.name, asset?.token_id, asset?.name]);

  if (!asset || !collection) {
    return <Loading />;
  }

  return (
    <a
      href={asset.permalink}
      className={styles.container}
      target="_blank"
      rel="noreferrer"
    >
      {asset.image_url.endsWith('mp4') ? (
        <video className={styles.image} src={asset.image_url} />
      ) : (
        <img className={styles.image} src={asset.image_url} />
      )}

      <div className={styles.top}>
        <p className={styles.price}>Ξ{collection?.stats.floor_price ?? 0}</p>

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
              Ξ{collection.stats.average_price.toFixed(3) ?? 0}
            </td>
          </tr>

          {!!collection.stats.one_day_average_price && (
            <tr className={styles.row}>
              <td className={styles.description}>1d Average Price</td>
              <td className={styles.value}>
                Ξ{collection.stats.one_day_average_price.toFixed(3)}
              </td>
            </tr>
          )}

          {!!collection.stats.seven_day_average_price && (
            <tr className={styles.row}>
              <td className={styles.description}>7d Average Price</td>
              <td className={styles.value}>
                Ξ{collection.stats.seven_day_average_price.toFixed(3)}
              </td>
            </tr>
          )}

          {!!collection.stats.one_day_sales && (
            <tr className={styles.row}>
              <td className={styles.description}>Sales (24h)</td>
              <td className={styles.value}>{collection.stats.one_day_sales}</td>
            </tr>
          )}
        </tbody>
      </table>
    </a>
  );
};

Item.Loading = Loading;

export default Item;
