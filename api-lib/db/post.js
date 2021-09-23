import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPostById(db, id) {
  const posts = await db.collection('posts').aggregate([
    { $match: { _id: new ObjectId(id) } },
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
      { $sort: { _id: -1 } },
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
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('posts').insertOne(post);
  post._id = insertedId;
  return post;
}
