import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// passport#160
passport.deserializeUser((req, id, done) => {
  req.db
    .collection('users')
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await req.db.collection('users').findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    },
  ),
);

export default passport;
