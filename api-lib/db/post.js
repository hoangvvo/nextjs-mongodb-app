import { nanoid } from 'nanoid';
import { dbProjectionUsers } from './user';

export async function findPostById(db, id) {
  const posts = await db.collection('posts').aggregate([
    { $match: { _id: id } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'users',
        localField: 'creatorId',
        foreignField: '_id',
        as: 'creator',
      },
    },
    { $unwind: '$creator' },
    { $project: dbProjectionUsers('creator.') },
  ]);
  if (!posts[0]) return null;
  return posts[0];
}

export async function findPosts(db, from, by, limit = 10) {
  return db
    .collection('posts')
    .aggregate([
      {
        $match: {
          ...(from && {
            createdAt: {
              $lte: from,
            },
          }),
          ...(by && { creatorId: by }),
        },
      },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertPost(db, { content, creatorId }) {
  const post = {
    _id: nanoid(12),
    content,
    creatorId,
    createdAt: new Date(),
  };
  await db.collection('posts').insertOne(post);
  return post;
}
