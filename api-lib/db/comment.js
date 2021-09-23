import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from '.';

export async function findComments(db, postId, from, limit = 10) {
  return db
    .collection('comments')
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
          ...(from && {
            createdAt: {
              $lte: from,
            },
          }),
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

export async function insertComment(db, postId, { content, creatorId }) {
  const comment = {
    content,
    postId: new ObjectId(postId),
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('comments').insertOne(comment);
  comment._id = insertedId;
  return comment;
}
