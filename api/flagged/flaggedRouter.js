const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Flagged = require('./flaggedModel');
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
  Flagged.getFlagged(id)
    .then((flagged) => {
      res.status(200).json(flagged);
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
    Flagged.addFlagged(id, name)
      .then((flagged) => {
        res.status(200).json(flagged);
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
  }
  const id = req.body.id;
  const name = req.body.destination_name;
  Flagged.removeFlagged(id, name)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
