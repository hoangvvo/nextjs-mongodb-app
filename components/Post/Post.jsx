import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './Post.module.css';
import { CloseOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { usePostPages } from '@/lib/post';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { Button, Spin } from 'antd';

const Post = ({ post, className, isDelete, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = usePostPages();

  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/posts', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: post._id }),
        });
        toast.success('You have deleted successfully');
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  const handlePublic = async (e) => {
    e.preventDefault();
    try {
      const requestBody = { id: post._id, published: !post.published };
      setIsLoading(true);
      await fetcher('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      toast.success('You have published successfully');
      mutate();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className={clsx(styles.root, className)}>
        <div className={styles.creatorContainer}>
          <Link href={`/user/${post.creator.username}`}>
            <div>
              <Container className={styles.creator}>
                <Avatar
                  size={36}
                  url={post.creator.profilePicture}
                  username={post.creator.username}
                />
                <Container column className={styles.meta}>
                  <p className={styles.name}>{post.creator.name}</p>
                  <p className={styles.username}>{post.creator.username}</p>
                </Container>
              </Container>
            </div>
          </Link>
        </div>
        <div className={styles.wrap}>
          <p className={styles.content} title={post.content}>{post.content}</p>
        </div>
        <div className={styles.wrap}>
          <time dateTime={String(post.createdAt)} className={styles.timestamp}>
            {timestampTxt}
          </time>
        </div>

        {
          isDelete && (
            <Button type="text" shape='circle' icon={<CloseOutlined />} className={styles.closeBtn} onClick={handleDelete} />
          )
        }

        {
          isPublished && (
            <Button type="primary" className={styles.publicBtn} size="small" shape="round" loading={isLoading} onClick={handlePublic}>
              {post.published ? 'Undisclosed' : 'Public'}
            </Button>
          )
        }
      </div>
    </Spin>
  );
};

export default Post;
