export default function initTripsController(db) {
  const create = async (req, res) => {
    const { location, startDate, endDate } = req.body;
    const { userId } = req.cookies;
    try {
      const trip = await db.Trip.create({
        userId,
        country: location.description,
        startDate,
        endDate,
      });
      res.send(trip);
    } catch (err) {
      console.log('error creating trip', err);
    }
  };

  const getDetails = async (req, res) => {
    const { tripId } = req.params;
    try {
      const trip = await db.Trip.findByPk(tripId);
      res.send(trip);
    } catch (err) {
      console.log('error getting trip details', err);
    }
  };

  const getTrips = async (req, res) => {
    const { userId } = req.cookies;
    try {
      const trips = await db.Trip.findAll({
        where: {
          userId,
        },
      });
      res.send(trips);
    } catch (err) {
      console.log('error getting trips', err);
    }
  };
  return {
    create, getDetails, getTrips,
  };
}
