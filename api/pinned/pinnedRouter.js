const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Pinned = require('./pinnedModel');
const router = express.Router();

router.get('/', function (req, res) {
  if (req.body.id == undefined) {
    res.status(401).json({ message: "missing id field in request body"})
  }
  const id = req.body.id
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
  if (!req.body.id) {
    res.status(401).json({ message: "missing id field in request body"})
  }
  if (!req.body.destination_name) {
    res.status(401).json({ message: "missing destination_name field in request body"})
  }
  const id = req.body.id
  const name = req.body.destination_name
  Pinned.addPinned(id, name)
    .then((pinned) => {
      res.status(200).json(pinned);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
