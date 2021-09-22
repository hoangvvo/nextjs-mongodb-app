import { Wrapper } from '@/components/Layout';
import Poster from './Poster';
import PostList from './PostList';
const PAGE_SIZE = 10;

export const Feed = () => {
  return (
    <Wrapper>
      <Poster />
      <PostList />
    </Wrapper>
  );
};
