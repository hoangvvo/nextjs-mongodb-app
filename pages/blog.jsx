import { Post } from '@/page-components/Blog';
import Head from 'next/head';

const PostPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Post />
    </>
  );
};

export default PostPage;
