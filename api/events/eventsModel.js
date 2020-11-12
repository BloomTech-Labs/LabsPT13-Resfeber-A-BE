const db = require('../../data/db-config');

const getEvents = async (userId) => {
  return await db('events').where({ user: userId });
};

const addEvent = (event) => {
  return db('events')
    .insert({ user: event.id, ...event })
    .returning('id');
};

const removeEvent = async (userId, name) => {
  return db('events').where({ user: userId, event_name: name }).delete();
};

const updateEvent = async (userId, name, event) => {
  console.log(event);
  return db('events').where({ user: userId, event_name: name }).update(event);
};
module.exports = {
  getEvents,
  addEvent,
  removeEvent,
  updateEvent,
};
