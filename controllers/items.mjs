export default function initItemsController(db) {
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

  const getItems = async (req, res) => {
    const { tripId } = req.params;
    try {
      const items = await db.Item.findAll({
        where: {
          tripId,
        },
      });
      res.send(items);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addItem, getItems,
  };
}
