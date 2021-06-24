import db from './models/index.mjs';
import initialisePassport from './passportConfig.mjs';
// import your controllers here
import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initAppointmentsController from './controllers/appointments.mjs';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

export default function bindRoutes(app, passport) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);
  const AppointmentsController = initAppointmentsController(db);
  initialisePassport(passport,
    async (email) => {
      const user = await db.User.findOne({ where: { email } });
      return user;
    }, async (id) => {
      const user = await db.User.findByPk(id);
      return user;
    });
  // initialize the controller functions here
  // pass in the db for all callbacks
  app.post('/add_appointment/:tripId', AppointmentsController.addAppointment);
  app.get('/get_appointments/:tripId', AppointmentsController.getAppointments);
  app.post('/delete_appointment/:appointmentId', AppointmentsController.deleteAppointment);
  app.post('/update_appointment', AppointmentsController.updateAppointment);
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) res.send('no user');
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.cookie('userId', user.id);
        return res.send('success');
      });
    })(req, res, next);
  });
  // successRedirect: FRONTEND_URL,
  // failureRedirect: `${FRONTEND_URL}/plan`,
  // failureFlash: true,
  app.post('/signup', UsersController.signup);
  app.delete('/logout', UsersController.logout);
  app.post('/createTrip', TripsController.create);
  app.get('/tripDetails/:tripId', TripsController.getDetails);
}
