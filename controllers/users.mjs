import bcrypt from 'bcrypt';

export default function initUsersController(db) {
  const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      await db.User.create({
        email,
        password: hashedPassword,
      });
      res.send('user created');
    } catch (err) {
      console.log(err);
    } };

  const logout = async (req, res, next) => {
    req.logOut();
    res.redirect('/');
  };

  return {
    signup, logout,
  };
}
