export default function initAppointmentsController(db) {
  const addAppointment = async (req, res) => {
    const { tripId } = req.params;
    const {
      marker, start, end,
    } = req.body;
    const {
      address, lat, lng,
    } = marker;
    const {
      description, place_id, types, structured_formatting,
    } = address;
    console.log(marker.address);
    const { main_text, secondary_text } = structured_formatting;
    try {
      const appointment = await db.Appointment.create({
        title: description,
        tripId,
        lat,
        lng,
        mainText: main_text,
        secondaryText: secondary_text,
        placeId: place_id,
        types,
        startDate: start,
        endDate: end,
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
    console.log(req.body);
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

  const addCustomAppointment = async (req, res) => {
    const { tripId } = req.params;
    const { startDate, endDate, title } = req.body;
    try {
      const appointment = await db.Appointment.create({
        tripId,
        startDate,
        endDate,
        title,
      });
      res.send(appointment);
    } catch (err) {
      console.log('error creating custom appointment', err);
    }
  };
  return {
    addAppointment, getAppointments, deleteAppointment, updateAppointment, addCustomAppointment,
  };
}
