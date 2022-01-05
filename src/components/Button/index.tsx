import cx from 'classnames';
import React from 'react';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={cx(props.className, styles.button)}>
      {props.children}
    </button>
  );
};

export default Button;
