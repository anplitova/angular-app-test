module.exports = app => {
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();
  router.post("/", events.sendEvent);

  router.get("/", events.searchEvents);

  router.get("/:id", events.searchEvent);

  app.use('/api/events', router);
};
