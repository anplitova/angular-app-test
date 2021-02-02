module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    username: {
      type: Sequelize.STRING
    },
    unit: {
      type: Sequelize.STRING
    },
    list: {
      type: Sequelize.STRING
    },
    theme: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    file: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    }
  });

  return Event;
};
