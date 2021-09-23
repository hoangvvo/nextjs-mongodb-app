import { findPostById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { Post } from '@/page-components/Post';
import nc from 'next-connect';
import Head from 'next/head';

export default function UserPost({ post }) {
  if (typeof post.createdAt !== 'string') {
    post.createdAt = new Date(post.createdAt);
  }
  return (
    <>
      <Head>
        <title>
          {post.creator.username}: {post.text}
        </title>
      </Head>
      <Post post={post} />
    </>
  );
}

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);

  const post = await findPostById(context.req.db, context.params.postId);
  if (!post) {
    return {
      notFound: true,
    };
  }
  if (context.params.username !== post.creator.username) {
    // mismatch params in url, redirect to correct one
    // eg. post x belongs to user a, but url is /user/b/post/x
    return {
      redirect: {
        destination: `/user/${post.creator.username}/post/${post._id}`,
        permanent: false,
      },
    };
  }
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
