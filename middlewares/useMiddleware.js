import useDatabase from './useDatabase';
import useSession from './useSession';
import useAuthentication from './useAuthentication';

const middleware = handler => useDatabase(useSession(useAuthentication(handler)));

export default middleware;
