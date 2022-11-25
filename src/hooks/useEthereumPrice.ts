import useRequest from './useRequest';

const useEthereumPrice = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data } = useRequest<{ current_price: number }[]>(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum',
    {
      refreshInterval: 5000,
    },
  );

  return data?.[0].current_price ?? 0;
};

export default useEthereumPrice;
