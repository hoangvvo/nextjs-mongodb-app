import { passport } from '@/api-lib/auth';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import session from './session';

const auth = nc(ncOpts)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default auth;
