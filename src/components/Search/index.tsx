import cx from 'classnames';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';

import styles from './Search.module.css';

interface Props {
  className?: string;
  placeholder?: string;
}

const Search = (props: Props) => {
  const { placeholder } = props;
  const [address, setAddress] = useState<string | undefined>(placeholder);
  const router = useRouter();

  return (
    <div className={cx(styles.search, props.className)}>
      <input
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Wallet Address"
        className={styles.input}
        value={address}
      />

      <Button
        className={styles.button}
        onClick={() => router.push(`/assets?address=${address}`)}
        disabled={!address}
      >
        Show
      </Button>
    </div>
  );
};

export default Search;
