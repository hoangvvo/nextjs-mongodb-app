import { ValidateProps } from '@/api-lib/constants';
import { findPostById } from '@/api-lib/db';
import { findComments, insertComment } from '@/api-lib/db/comment';
import { all, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(all);

handler.get(async (req, res) => {
  const post = await findPostById(req.db, req.query.postId);

  if (!post) {
    return res.status(404).send('post not found');
  }

  const comments = await findComments(
    req.db,
    req.query.postId,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.send({ comments });
});

handler.post(
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.comment.content,
    },
    required: ['content'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }

    const content = req.body.content;

    const post = await findPostById(req.db, req.query.postId);

    if (!post) {
      return res.status(404).send('post not found');
    }

    const comment = await insertComment(req.db, post._id, {
      creatorId: req.user._id,
      content,
    });

    return res.json({ comment });
  }
);

export default handler;
