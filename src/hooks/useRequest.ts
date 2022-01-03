import useSWR from 'swr';

interface Options {
  shouldFetch?: boolean;
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const useRequest = <T extends unknown>(
  url: string,
  options: Options = {
    shouldFetch: true,
  },
) => {
  const response = useSWR<T>(options.shouldFetch ? url : null, fetcher);

  return response;
};

export default useRequest;
