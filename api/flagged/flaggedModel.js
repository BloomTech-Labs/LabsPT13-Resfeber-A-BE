const db = require('../../data/db-config');

const getFlagged = async (userId) => {
  return await db('flagged_destinations').where({ 'user': userId});
};

const addFlagged = (userId, name) => {
  return db('flagged_destinations').insert({"user": userId, "destination_name": name})
  .returning("id");
};

const removeFlagged = async (userId, destination_name) => {
  return db('flagged_destinations').where({'user': userId, 'destination_name': destination_name}).delete()
};

module.exports = {
  getFlagged,
  addFlagged,
  removeFlagged
};
