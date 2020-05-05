import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data && data.user;
  return [user, { mutate }];
}
