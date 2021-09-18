import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useCommentPages({ postId, limit = 10 } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.comments.length === 0)
        return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (index !== 0) {
        const from = new Date(
          new Date(
            previousPageData.comments[
              previousPageData.comments.length - 1
            ].createdAt
          ).getTime() - 1
        );

        searchParams.set('from', from.toJSON());
      }

      return `/api/posts/${postId}/comments?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );
}
