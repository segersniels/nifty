import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useRequest = <T extends unknown>(
  url: string,
  options: Partial<PublicConfiguration> & {
    shouldFetch?: boolean;
  },
) => {
  const { shouldFetch = true } = options;

  const response = useSWR<T>(shouldFetch ? url : null, fetcher, {
    refreshInterval: options.refreshInterval,
    onSuccess: options.onSuccess,
  });

  return response;
};

export default useRequest;
