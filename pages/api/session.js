import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => {
  if (req.user) {
    const {
      name, email, bio, profilePicture, emailVerified,
    } = req.user;
    return res.json({
      data: {
        isLoggedIn: true,
        user: {
          name,
          email,
          bio,
          profilePicture,
          emailVerified,
        },
      },
    });
  }
  return res.json({
    data: {
      isLoggedIn: false,
      user: {},
    },
  });
});

handler.delete((req, res) => {
  req.logOut();
  res.json({
    ok: true,
    message: 'You have been logged out.',
  });
});

export default handler;
