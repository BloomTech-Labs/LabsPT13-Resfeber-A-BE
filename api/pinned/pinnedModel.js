const db = require('../../data/db-config');

const getPinned = async (userId) => {
  return await db('pinned_destinations').where({ user: userId });
};

const addPinned = (pinned) => {
  const id = pinned.id;
  delete pinned.id;
  return db('pinned_destinations')
    .insert({ user: id, ...pinned })
    .returning('id');
};

const removePinned = async (userId, teleport_id) => {
  return db('pinned_destinations')
    .where({ user: userId, teleport_id: teleport_id })
    .delete();
};

module.exports = {
  getPinned,
  addPinned,
  removePinned,
};
