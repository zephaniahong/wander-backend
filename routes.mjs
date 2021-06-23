import db from './models/index.mjs';

// import your controllers here
import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initAppointmentsController from './controllers/appointments.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);
  const AppointmentsController = initAppointmentsController(db);
  // initialize the controller functions here
  // pass in the db for all callbacks
  app.post('/add_appointment/:tripId', AppointmentsController.addAppointment);
  app.get('/get_appointments/:tripId', AppointmentsController.getAppointments);
  app.post('/delete_appointment/:appointmentId', AppointmentsController.deleteAppointment);
  app.post('/update_appointment', AppointmentsController.updateAppointment);
  app.post('/login', UsersController.login);
  app.post('/signup', UsersController.signup);
}
