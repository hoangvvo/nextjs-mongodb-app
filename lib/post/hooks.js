import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function usePostPages({ creatorId, limit = 10 } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (creatorId) searchParams.set('by', creatorId);

      if (index !== 0) {
        // using oldest posts createdAt date as cursor
        // We want to fetch posts which has a date that is
        // before (hence the .getTime() - 1) the last post's createdAt
        const from = new Date(
          new Date(
            previousPageData.posts[previousPageData.posts.length - 1].createdAt
          ).getTime() - 1
        );

        searchParams.set('from', from.toJSON());
      }

      return `/api/posts?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );
}
