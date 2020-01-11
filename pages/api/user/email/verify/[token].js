import nextConnect from 'next-connect';
import database from '../../../../../middlewares/database';

const handler = nextConnect();

handler.use(database);

handler.get(async (req, res) => {
  try {
    const { token } = req.query;
    const { value: tokenDoc } = await req.db
      .collection('tokens')
      .findOneAndDelete({ token, type: 'emailVerify' });

    if (!tokenDoc) {
      res.status(401).json({
        ok: false,
        message: 'This link may have been expired.',
      });
      return;
    }

    await req.db
      .collection('users')
      .updateOne({ _id: tokenDoc.userId }, { $set: { emailVerified: true } });

    res.json({
      ok: true,
      message: 'Success! Thank you for verifying your email address. You may close this page.',
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString(),
    });
  }
});

export default handler;
