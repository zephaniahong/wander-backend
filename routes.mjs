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
  app.post('/add_item/:tripId', AppointmentsController.addItem);
  app.get('/get_appointments/:tripId', AppointmentsController.getAppointments);
}
