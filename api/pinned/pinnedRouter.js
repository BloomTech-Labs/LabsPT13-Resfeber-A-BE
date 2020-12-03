const express = require('express');
const Pinned = require('./pinnedModel');
const router = express.Router();

router.get('/:id', function (req, res) {
  if (!req.params.id) {
    res.status(400).json({ message: 'missing id field in request body' });
  }
  const id = req.params.id;
  Pinned.getPinned(id)
    .then((pinned) => {
      res.status(200).json(pinned);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.use('/', function (req, res, next) {
  if (!req.body.id) {
    res.status(400).json({ message: 'missing id field in request body' });
  } else if (!req.body.teleport_id) {
    res
      .status(400)
      .json({ message: 'missing teleport_id field in request body' });
  } else {
    next();
  }
});

router.post('/', function (req, res) {
  if (!req.body.destination_name) {
    res
      .status(401)
      .json({ message: 'missing destination_name field in request body' });
  } else {
    Pinned.addPinned(req.body)
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
  const id = req.body.id;
  const teleport_id = req.body.teleport_id;
  Pinned.removePinned(id, teleport_id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
