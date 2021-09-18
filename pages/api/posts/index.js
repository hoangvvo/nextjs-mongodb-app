import { getPosts, insertPost } from '@/api-lib/db';
import { all, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

const maxAge = 1 * 24 * 60 * 60;

handler.get(database, async (req, res) => {
  const posts = await getPosts(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  if (req.query.from && posts.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader('cache-control', `public, max-age=${maxAge}`);
  }

  res.send({ posts });
});

handler.post(all, async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  if (!req.body.content)
    return res.status(400).send('You must write something');

  const post = await insertPost(req.db, {
    content: req.body.content,
    creatorId: req.user._id,
  });

  return res.json({ post });
});

export default handler;
