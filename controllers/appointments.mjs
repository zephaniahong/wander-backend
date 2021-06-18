export default function initAppointmentsController(db) {
  const addAppointment = async (req, res) => {
    const { tripId } = req.params;
    const {
      text, place_id, structured_formatting, types, startDate, endDate,
    } = req.body;
    const { main_text, secondary_text } = structured_formatting;
    try {
      const appointment = await db.Appointment.create({
        text,
        tripId,
        types,
        placeId: place_id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
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

  const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    try {
      await db.Appointment.destroy({
        where: {
          id: appointmentId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    addAppointment, getAppointments, deleteAppointment,
  };
}
