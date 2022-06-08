import { Post } from '@/page-components/Post';
import Head from 'next/head';

const PostPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <Post />
    </>
  );
};

export default PostPage;
