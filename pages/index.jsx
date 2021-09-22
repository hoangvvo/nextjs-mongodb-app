import { Button } from '@/components/Button';
import { useCurrentUser } from '@/lib/user';

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <Button>test</Button>
    </>
  );
};

export default IndexPage;
