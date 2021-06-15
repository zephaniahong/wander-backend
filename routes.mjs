import db from './models/index.mjs';

// import your controllers here
import initTripsController from './controllers/trips.mjs';
import initUsersController from './controllers/users.mjs';
import initItemsController from './controllers/items.mjs';

export default function bindRoutes(app) {
  const TripsController = initTripsController(db);
  const UsersController = initUsersController(db);
  const ItemsController = initItemsController(db);
  // initialize the controller functions here
  // pass in the db for all callbacks
  app.post('/add_item/:tripId', ItemsController.addItem);
  app.get('/get_items/:tripId', ItemsController.getItems);
}
