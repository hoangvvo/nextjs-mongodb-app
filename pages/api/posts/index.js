import { ValidateProps } from '@/api-lib/constants';
import { findPosts, insertPost } from '@/api-lib/db';
import { all, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(all);

handler.get(async (req, res) => {
  const posts = await findPosts(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.send({ posts });
});

handler.post(
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.post.content,
    },
    required: ['content'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }

    const post = await insertPost(req.db, {
      content: req.body.content,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

export default handler;
