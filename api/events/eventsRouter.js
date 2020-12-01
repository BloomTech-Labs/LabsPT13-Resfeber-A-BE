const express = require('express');
const Events = require('./eventsModel');
const router = express.Router();

router.get('/:id', function (req, res) {
  if (!req.params.id) {
    res.status(400).json({ message: 'missing id field in request body' });
  }
  const id = req.params.id;
  Events.getEvents(id)
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.use('/', function (req, res, next) {
  if (!req.body.id) {
    res.status(401).json({ message: 'missing id field in request body' });
  } else {
    next();
  }
});

router.post('/', function (req, res) {
  if (!req.body.event_name) {
    res
      .status(401)
      .json({ message: 'missing event_name field in request body' });
  }
  const event = req.body;
  event.user = req.body.id;
  delete event.id;
  Events.addEvent(event)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete('/', function (req, res) {
  if (!req.body.event_name) {
    res
      .status(401)
      .json({ message: 'missing event_name field in request body' });
  }
  const id = req.body.id;
  const name = req.body.event_name;
  Events.removeEvent(id, name)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/', function (req, res) {
  if (!req.body.event_name) {
    res
      .status(401)
      .json({ message: 'missing event_name field in request body' });
  }
  const id = req.body.id;
  const name = req.body.event_name;
  const event = req.body;
  event.user = req.body.id;
  delete event.id;
  Events.updateEvent(id, name, event)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});
module.exports = router;
