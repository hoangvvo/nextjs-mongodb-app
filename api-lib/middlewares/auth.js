import { passport } from '@/api-lib/auth';
import nc from 'next-connect';
import session from './session';

const auth = nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default auth;
