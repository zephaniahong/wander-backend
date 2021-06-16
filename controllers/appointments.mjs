export default function initAppointmentsController(db) {
  const addItem = async (req, res) => {
    const { tripId } = req.params;
    const {
      description, place_id, structured_formatting, types,
    } = req.body.infoObj;
    const { main_text, secondary_text } = structured_formatting;
    try {
      const item = await db.Item.create({
        description,
        tripId,
        type: types,
        placeId: place_id,
        mainText: main_text,
        secondaryText: secondary_text,
      });

      res.send(item);
    } catch (err) {
      console.log('addItem', err);
    }
  };

  const getAppointments = async (req, res) => {
    const { tripId } = req.params;
    try {
      const appointments = await db.Appointment.findAll({
        where: {
          tripId,
        },
      });
      res.send(appointments);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addItem, getAppointments,
  };
}
