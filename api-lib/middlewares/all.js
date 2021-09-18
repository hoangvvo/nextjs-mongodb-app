import nc from 'next-connect';
import auth from './auth';
import database from './database';

const all = nc();

all.use(database).use(auth);

export default all;
