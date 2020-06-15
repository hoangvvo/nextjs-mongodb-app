import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from "passport-facebook";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// passport#160
passport.deserializeUser((req, id, done) => {
  req.db
    .collection('users')
    .findOne({ _id: id })
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
passport.use(
  new FacebookStrategy(
     {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.WEB_URI}/api/user/facebook/callback`,
        profileFields: ["name", "email", "link", "locale", "timezone", "gender"],
        passReqToCallback: true,
     },
     async (req, accessToken, refreshToken, profile, done) => {
        // if user is new, save,
        // if user is already in db, return user

        //  console.log("req.db.collection users", req.db.collection("users"));
        console.log("profile", JSON.stringify(profile));
        if (profile.emails) {
           req.db.collection("users").findOne({ email: profile.emails[0].value }, async (err, user) => {
              if (err)
                 done(err, false);
                 
              if (user) {
                 if (user.facebookId === profile.id) {
                    done(null, user);
                 } else {
                    await req.db.collection("users").findOneAndUpdate({ email: profile.emails[0].value }, { $set: { facebookId: profile.id } });
                    done(null, user);
                 }
              } else {
                 const userFields = {
                    email: profile.emails[0].value ? profile.emails[0].value : null,
                    password: randomId(8),
                    username: profile.emails[0].value ? profile.emails[0].value : null,
                   
                 };
                 const newUser = await req.db.collection('users').createOne(userFields);
                 done(null, newUser);
              }
           });
        } else {
           done(null, false);
        }
     }
  )
);


export default passport;
