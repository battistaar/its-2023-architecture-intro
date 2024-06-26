import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentity as UserIdentitModel } from "./user-identity.model";
import * as bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      const identity = await UserIdentitModel.findOne({'credentials.username': username});
      if (!identity) {
        return done(null, false, {message: `username ${username} not found`});
      }
      const match = await bcrypt.compare(password, identity.credentials.password);
      if (match) {
        return done(null, identity.toObject().user);
      }
      done(null, false, {message: 'invalid password'});
    } catch(err) {
      done(err, false);
    }
  })
);