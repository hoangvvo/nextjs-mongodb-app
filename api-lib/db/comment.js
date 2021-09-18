export async function findComments(db, postId, from, limit) {
  return db
    .collection('comments')
    .find({
      postId,
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
    })
    .sort({ $natural: -1 })
    .limit(limit)
    .toArray();
}

export async function insertComment(db, postId, { content, creatorId }) {
  const comment = {
    content,
    postId,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('comments').insertOne(comment);
  comment._id = insertedId;
  return comment;
}
