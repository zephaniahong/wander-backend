export default function initAppointmentsController(db) {
  const addAppointment = async (req, res) => {
    const { tripId } = req.params;
    const {
      description, place_id, structured_formatting, types, startDate, endDate, lat, lng,
    } = req.body;
    const { main_text, secondary_text } = structured_formatting;
    try {
      const appointment = await db.Appointment.create({
        text: description,
        tripId,
        types,
        lat,
        lng,
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

  const updateAppointment = async (req, res) => {
    const data = req.body;
    const id = Object.keys(data)[0];
    const changesKeys = Object.keys(data[id]);
    try {
      const appointment = await db.Appointment.findByPk(id);
      for (let i = 0; i < changesKeys.length; i += 1) {
        console.log('i am length', changesKeys[i]);
        appointment[changesKeys[i]] = data[id][changesKeys[i]];
      }
      await appointment.save();
      res.send(appointment);
    } catch (err) {
      console.log('error updating appointment', err);
    }
  };
  return {
    addAppointment, getAppointments, deleteAppointment, updateAppointment,
  };
}
