const express = require('express');
const trips = require('./tripsModel');
const items = require('../items/itemsModel');
const router = express.Router();

const user_idParamsRequired = (req, res, next) => {
  if (!req.params.user_id) {
    res.status(400).json({ message: 'params should have user_id' });
  } else {
    next();
  }
};

router.get('/:user_id', user_idParamsRequired, function (req, res) {
  const id = req.params.user_id;
  trips
    .getTrips(id)
    .then((trips) => {
      res.status(200).json(trips);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:user_id/all', user_idParamsRequired, function (req, res) {
  const user_id = req.params.user_id;
  trips
    .getAll(user_id)
    .then((trips) => {
      res.status(200).json(trips);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:user_id/:trip_id', user_idParamsRequired, function (req, res) {
  const user_id = req.params.user_id;
  const trip_id = req.params.trip_id;
  items
    .getTripItems(user_id, trip_id)
    .then((trips) => {
      res.status(200).json(trips);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', function (req, res) {
  if (!req.body.user_id) {
    res.status(400).json({ message: 'request body should have user_id field' });
  }
  const trip = req.body;
  let trip_items;
  if (trip.items) {
    trip_items = req.body.items;
    delete trip.items;
  }
  trips
    .addTrip(trip)
    .then((response) => {
      if (trip_items.length > 0) {
        // if there are nested trip items
        trip_items.forEach((item) => {
          item.user_id = response[0].user_id;
          item.trip_id = response[0].id;
          items.addItem(item).catch((error) => {
            console.log(error);
          });
        });
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.use('/', function (req, res, next) {
  if (!req.body.trip_id) {
    res.status(401).json({ message: 'request body should have trip_id field' });
  } else {
    next();
  }
});

router.delete('/', function (req, res) {
  const trip_id = req.body.trip_id;
  trips
    .removeTrip(trip_id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/', function (req, res) {
  const trip_id = req.body.trip_id;
  const trip = req.body;
  delete trip.trip_id;
  trips
    .updateTrip(trip_id, trip)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});
module.exports = router;
