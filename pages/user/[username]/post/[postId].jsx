import { findPostById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { UserPost } from '@/page-components/UserPost';
import Head from 'next/head';

export default function UserPostPage({ post }) {
  if (typeof post.createdAt !== 'string') {
    post.createdAt = new Date(post.createdAt);
  }
  return (
    <>
      <Head>
        <title>
          {post.creator.name} ({post.creator.username}): {post.content}
        </title>
      </Head>
      <UserPost post={post} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const post = await findPostById(db, context.params.postId);
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
  post._id = String(post._id);
  post.creatorId = String(post.creatorId);
  post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
