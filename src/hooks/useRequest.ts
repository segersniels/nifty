import useSWR from 'swr';

interface Options {
  shouldFetch?: boolean;
  refreshInterval?: number;
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const useRequest = <T extends unknown>(
  url: string,
  options: Options = {
    shouldFetch: true,
    refreshInterval: 0,
  },
) => {
  const response = useSWR<T>(options.shouldFetch ? url : null, fetcher, {
    refreshInterval: options.refreshInterval,
  });

  return response;
};

export default useRequest;
