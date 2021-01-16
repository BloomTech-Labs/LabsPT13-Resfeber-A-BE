const db = require('../../data/db-config');

const getTrips = async (userId) => {
  return await db('trips').where({ user_id: userId });
};

const getAll = async (userId) => {
  const trips = await db('trips').where({ user_id: userId });
  const items = await db('trip_items').where({ user_id: userId });
  trips.forEach((trip) => {
    trip.items = [];
    items.forEach((item) => {
      if (trip.id == item.trip_id) {
        trip.items.push(item);
        //delete item - this would provide optimization but commit linter doesn't like it so..
      }
    });
  });
  return trips;
};

const addTrip = (trip) => {
  return db('trips').insert(trip).returning('*');
};

const removeTrip = async (trip_id) => {
  return db('trips').where({ id: trip_id }).delete();
};

const updateTrip = async (trip_id, changes) => {
  return db('trips').where({ id: trip_id }).update(changes).returning('*');
};

module.exports = {
  getTrips,
  getAll,
  addTrip,
  removeTrip,
  updateTrip,
};
