export default function initTripsController(db) {
  const update = async (req, res) => {
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

  return {
    update,
  };
}
