import useSWR from 'swr';

const useRequest = <T extends unknown>(url: string) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const response = useSWR<T>(url, fetcher);

  return response;
};

export default useRequest;
