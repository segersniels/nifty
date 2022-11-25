import Currency from 'enums/Currency';
import useEthereumPrice from 'hooks/useEthereumPrice';
import React, { useCallback, useContext, useState } from 'react';

interface ContextType {
  price: number;
  currency: Currency;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
  determineWorth: (worth: number) => number;
  switchCurrency: () => void;
}

const ValueContext = React.createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ValueContextProvider = (props: Props) => {
  const { children } = props;
  const price = useEthereumPrice();
  const [currency, setCurrency] = useState<Currency>(
    Currency.UnitedStatesDollar,
  );

  const determineWorth = useCallback(
    (worth: number) => {
      if (!worth) {
        return 0;
      } else if (currency === Currency.Ethereum) {
        return worth;
      }

      return worth * price;
    },
    [currency, price],
  );

  const switchCurrency = useCallback(() => {
    if (currency === Currency.Ethereum) {
      return setCurrency(Currency.UnitedStatesDollar);
    }

    return setCurrency(Currency.Ethereum);
  }, [currency]);

  return (
    <ValueContext.Provider
      value={{
        price,
        currency,
        setCurrency,
        determineWorth,
        switchCurrency,
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};

export const useValueContext = () => {
  const context = useContext(ValueContext);

  if (context === null) {
    throw new Error(
      'Please use useValueContext within an ValueContextProvider',
    );
  }

  return context;
};
