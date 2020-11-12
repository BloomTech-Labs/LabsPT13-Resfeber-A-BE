const db = require('../../data/db-config');

const getPinned = async (userId) => {
  return await db('pinned_destinations').where({ user: userId });
};

const addPinned = (userId, name) => {
  return db('pinned_destinations')
    .insert({ user: userId, destination_name: name })
    .returning('id');
};

const removePinned = async (userId, destination_name) => {
  return db('pinned_destinations')
    .where({ user: userId, destination_name: destination_name })
    .delete();
};

module.exports = {
  getPinned,
  addPinned,
  removePinned,
};
