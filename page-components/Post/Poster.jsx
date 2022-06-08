import { Avatar } from '@/components/Avatar';
import { Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { checkPermission } from 'utils';
import Link from 'next/link';
import styles from './Poster.module.css';
import PosterInner from './PosterInner';
import { PERMISSION } from 'constants/permission';

const Poster = ({ data, error }) => {
  const loading = !data && !error;
  const isCreate = checkPermission(data, PERMISSION.POST.POST_CREATE);

  return isCreate && (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>
          <Avatar style={{ marginRight: 8 }} size={40} username={data?.user?.username} url={data?.user?.profilePicture} />
          {data?.user ? `What's on your post, ${data?.user.name}?` : 'Share your posts'}
        </h3>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
