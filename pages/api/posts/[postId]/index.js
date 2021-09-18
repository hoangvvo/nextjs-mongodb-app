import { findPostById } from '@/api-lib/db';

const { ncOpts } = require('@/api-lib/nc');

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const post = await findPostById(req.db, req.query.postId);
  res.send({ post });
});

export default handler;
