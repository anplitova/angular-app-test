const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

exports.sendEvent = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const event = {
    username: req.body.username,
    unit: req.body.unit,
    list: req.body.list,
    theme: req.body.theme,
    message: req.body.message,
    file: req.body.file,
    date: req.body.date,
    time: req.body.time
  };

  Event.create(event)
    .then(data => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.searchEvents = (req, res) => {
  const theme = req.query.theme;
  let list = [];

  Event.findAll({ where: { theme: theme } })
    .then(data => {
      if (data.length > 1) {
        list = data.map((item) => {
          return {
            id: item.id,
            username: item.username,
            unit: item.unit
          }
        });
        res.send(list);
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.searchEvent = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};
