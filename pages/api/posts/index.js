import { ValidateProps } from '@/api-lib/constants';
import { deletePost, findPosts, insertPost, putPost } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const posts = await findPosts(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ posts });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      title: ValidateProps.post.title,
      content: ValidateProps.post.content,
    },
    required: ['content'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertPost(req.db, {
      title: req.body.title,
      content: req.body.content,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

handler.delete(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      id: ValidateProps.post.id,
    },
    required: ['id'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const result = await deletePost(req.db, {
      id: req.body.id
    });

    return res.json({ ...result, id: req.body.id });
  }
);

handler.put(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      id: ValidateProps.post.id,
      title: ValidateProps.post.title,
      content: ValidateProps.post.content,
      published: ValidateProps.post.published,
    },
    required: ['id'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const result = await putPost(req.db, {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    });

    return res.json({ ...result, id: req.body.id });
  }
);

export default handler;
