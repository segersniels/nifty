import cx from 'classnames';
import Button from 'components/Button';
import * as gtag from 'lib/gtag';
import { useRouter } from 'next/router';
import React, { FormEvent, useCallback } from 'react';
import { useState } from 'react';

import styles from './Search.module.css';

interface Props {
  className?: string;
  placeholder?: string;
}

const Search = (props: Props) => {
  const { placeholder } = props;
  const [address, setAddress] = useState<string>('');
  const router = useRouter();

  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!address?.length) {
        return;
      }

      gtag.event({
        action: 'search_input',
        category: 'address',
        label: address,
      });

      router.push(`/assets?address=${address}`);
    },
    [address, router],
  );

  return (
    <form
      className={cx(styles.search, props.className)}
      onSubmit={handleSearch}
    >
      <input
        onChange={(e) => setAddress(e.target.value.trim())}
        placeholder={placeholder ?? 'Wallet Address'}
        className={styles.input}
        value={address}
        type="text"
      />

      <Button
        className={styles.button}
        disabled={!address?.length}
        type="submit"
      >
        Show
      </Button>
    </form>
  );
};

export default Search;
