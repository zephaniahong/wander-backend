export default function initAppointmentsController(db) {
  const addAppointment = async (req, res) => {
    const { tripId } = req.params;
    const {
      description, place_id, structured_formatting, types,
    } = req.body.infoObj;
    const { main_text, secondary_text } = structured_formatting;
    try {
      const appointment = await db.Item.create({
        description,
        tripId,
        type: types,
        placeId: place_id,
        mainText: main_text,
        secondaryText: secondary_text,
      });

      res.send(appointment);
    } catch (err) {
      console.log('addAppointment', err);
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
    addAppointment, getAppointments,
  };
}
