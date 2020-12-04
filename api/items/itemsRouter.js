const express = require('express');
const items = require('./itemsModel');
const router = express.Router();

router.get('/:user_id', function (req, res) {
  if (!req.params.user_id) {
    res.status(400).json({ message: 'params should have user_id' });
  }
  const id = req.params.user_id;
  items
    .getItems(id)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', function (req, res) {
  const item = req.body;
  items
    .addItem(item)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.use('/', function (req, res, next) {
  if (!req.body.item_id) {
    res.status(401).json({ message: 'request body should have item_id field' });
  } else {
    next();
  }
});

router.delete('/', function (req, res) {
  const item_id = req.body.item_id;
  items
    .removeItem(item_id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/', function (req, res) {
  const item_id = req.body.item_id;
  const item = req.body;
  delete item.item_id;
  items
    .updateItem(item_id, item)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});
module.exports = router;
