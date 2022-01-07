import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from '../Item.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.image} height="20rem" borderRadius={0} />

      <div className={styles.top}>
        <p className={styles.price}>
          <Skeleton width="5rem" />
        </p>

        <p className={styles.name}>
          <Skeleton width="15rem" />
        </p>
      </div>

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
