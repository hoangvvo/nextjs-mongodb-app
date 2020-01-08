import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// passport#160
passport.deserializeUser((id, req, done) => req.db
  .collection('users')
  .findOne(ObjectId(req.session.userId))
  .then(user => done(null, user)));

passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
  const user = req.db
    .collection('users')
    .findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) done(null, user);
  else done('Email or password is incorrect', user);
}));

export default passport;
