import db from './models/index.mjs';
import initialisePassport from './passportConfig.mjs';
// import your controllers here
import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initAppointmentsController from './controllers/appointments.mjs';

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
  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.cookie('userId', req.user.id);
    res.send('success');
  });
  app.post('/signup', UsersController.signup);
  app.delete('/logout', UsersController.logout);
  app.post('/createTrip', TripsController.create);
  app.get('/tripDetails/:tripId', TripsController.getDetails);
  app.get('/checkLoggedIn', (req, res) => {
    if (req.isAuthenticated()) {
      return res.send('authenticated');
    }
    return res.send('not authenticated');
  });
  app.post('/signout', (req, res) => {
    console.log('backend signout');
    req.logOut();
    res.send('success');
  });

  app.get('/getTrips', TripsController.getTrips);
}
