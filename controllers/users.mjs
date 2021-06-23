import bcrypt from 'bcrypt';

export default function initUsersController(db) {
  const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log(password);
      console.log(user.password);
      const correctDetails = await bcrypt.compare(password, user.password);
      if (correctDetails) {
        console.log('success');
        res.cookie('userId', user.id);
        res.sendStatus(200);
      } else {
        res.cookie('userId', null);
        res.sendStatus(403);
      }
    } catch (err) {
      console.log(err);
    } };

  // const login = async (req, res) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) throw err;
  //     if (!user) res.send('No User Exists');
  //     else {
  //       req.logIn(user, (err) => {
  //         if (err) throw err;
  //         res.send('success');
  //       });
  //     }
  //   });
  // };

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
  // const userTrips = async (req, res) => {
  //   const { userId } = req.params;
  //   try {
  //     const trips = await db.Trip.findAll({
  //       where: {
  //         userId: Number(userId),
  //       },
  //     });

  //     res.send(trips);
  //   } catch (err) {
  //     console.log('====== userTrips err ======\n', err);
  //   }
  // };

  // const getLikedItems = async (req, res) => {
  //   const { userId } = req.params;
  //   try {
  //     const user = await db.User.findByPk(Number(userId));
  //     const likedItems = await user.getItems();
  //     res.send(likedItems);
  //   } catch (err) {
  //     console.log('====== getLikedItems err ======\n', err);
  //   }
  // };

  // const addLikedItem = async (req, res) => {
  //   const { itemId, userId } = req.params;
  //   // const { userId } = req.cookies;

  //   try {
  //     const user = await db.User.findByPk(Number(userId));
  //     const item = await db.Item.findByPk(Number(itemId));

  //     const likedItem = await user.addItem(item);

  //     res.send(likedItem);
  //   } catch (err) {
  //     console.log('====== addLikedItem ======\n', err);
  //   }
  // };

  // const deleteLikedItem = async (req, res) => {
  //   const { itemId, userId } = req.params;

  //   try {
  //     const user = await db.User.findByPk(Number(userId));
  //     // console.log('====== user: ====== \n', user.__proto__);
  //     const itemRemoved = await user.removeItem(itemId);

  //     res.send(itemRemoved.toString());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return {
    // userTrips, getLikedItems, addLikedItem, deleteLikedItem,
    login, signup,
  };
}
