import bcrypt from 'bcrypt';
import LocalStrategy, { Strategy } from 'passport-local';
import db from './models/index.mjs';

export default function initialise(passport, getUserEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect' });
    } catch (err) {
      return done(err);
    }
  };
  // option field defaults to username and password.
  // so if your db column name is something else then have to specifiy
  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => { done(null, user.id); });
  passport.deserializeUser((id, done) => { done(null, id); });
}
