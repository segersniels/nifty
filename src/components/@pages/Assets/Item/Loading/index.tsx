import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from '../Item.module.css';

const Loading = () => {
  return (
    <div className={styles.item}>
      <p className={styles.price}>
        <Skeleton width="5rem" />
      </p>

      <p className={styles.name}>
        <Skeleton width="15rem" />
      </p>

      <Skeleton className={styles.image} width="18.5rem" height="18.5rem" />

      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.description}>
              <Skeleton width="10rem" />
            </td>
            <td className={styles.value}>
              <Skeleton width="3rem" />
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.description}>
              <Skeleton width="5rem" />
            </td>
            <td className={styles.value}>
              <Skeleton width="2rem" />
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.description}>
              <Skeleton width="8rem" />
            </td>
            <td className={styles.value}>
              <Skeleton width="4rem" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Loading;
