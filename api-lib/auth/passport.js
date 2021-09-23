import {
  findUserWithEmailAndPassword,
  UNSAFE_findUserForAuth,
} from '@/api-lib/db';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// passport#160
passport.deserializeUser((req, id, done) => {
  UNSAFE_findUserForAuth(req.db, id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await findUserWithEmailAndPassword(req.db, email, password);
      if (user) done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    }
  )
);

export default passport;
