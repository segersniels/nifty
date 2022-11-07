import NextImage from 'next/image';
import React, { useCallback } from 'react';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

import styles from './Item.module.css';
import Loading from './Loading';

interface Props {
  asset: Asset;
  collection: Collection;
}

const formatEthereumValue = (value: number) => {
  return `Ξ${value.toFixed(3)}`;
};

const Image = ({ asset }: { asset: Asset }) => {
  if (!asset.image_url) {
    return (
      <div className={styles.wrapper}>
        <NextImage
          className={styles.image}
          src={asset.collection.large_image_url}
          layout="fill"
          alt=""
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {asset.image_url.endsWith('mp4') ? (
        <video className={styles.image} src={asset.image_url} />
      ) : (
        <NextImage
          className={styles.image}
          src={asset.image_url}
          layout="fill"
          alt=""
        />
      )}
    </div>
  );
};

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
      <Image asset={asset} />

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
                {formatEthereumValue(
                  asset.last_sale.total_price / 1000000000000000000,
                )}
              </td>
            </tr>
          )}

          <tr className={styles.row}>
            <td className={styles.description}>Average Price</td>
            <td className={styles.value}>
              {formatEthereumValue(collection.stats.average_price ?? 0)}
            </td>
          </tr>

          {!!collection.stats.one_day_average_price && (
            <tr className={styles.row}>
              <td className={styles.description}>1d Average Price</td>
              <td className={styles.value}>
                {formatEthereumValue(collection.stats.one_day_average_price)}
              </td>
            </tr>
          )}

          {!!collection.stats.seven_day_average_price && (
            <tr className={styles.row}>
              <td className={styles.description}>7d Average Price</td>
              <td className={styles.value}>
                {formatEthereumValue(collection.stats.seven_day_average_price)}
              </td>
            </tr>
          )}

          {!!collection.stats.one_day_volume && (
            <tr className={styles.row}>
              <td className={styles.description}>1d Volume</td>
              <td className={styles.value}>
                {formatEthereumValue(collection.stats.one_day_volume)}
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
