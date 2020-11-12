const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Pinned = require('./pinnedModel');
const router = express.Router();

router.use('/', function (req, res, next) {
  if (!req.body.id) {
    res.status(401).json({ message: 'missing id field in request body' });
  } else {
    next();
  }
});

router.get('/', function (req, res) {
  const id = req.body.id;
  Pinned.getPinned(id)
    .then((pinned) => {
      res.status(200).json(pinned);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', function (req, res) {
  if (!req.body.destination_name) {
    res
      .status(401)
      .json({ message: 'missing destination_name field in request body' });
  } else {
    const id = req.body.id;
    const name = req.body.destination_name;
    Pinned.addPinned(id, name)
      .then((pinned) => {
        res.status(200).json(pinned);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
});

router.delete('/', function (req, res) {
  if (!req.body.destination_name) {
    res
      .status(401)
      .json({ message: 'missing destination_name field in request body' });
  } else {
    const id = req.body.id;
    const name = req.body.destination_name;
    Pinned.removePinned(id, name)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
});

module.exports = router;
