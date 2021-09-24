import { passport } from '@/api-lib/auth';
import session from './session';

const auths = [session, passport.initialize(), passport.session()];

export default auths;
