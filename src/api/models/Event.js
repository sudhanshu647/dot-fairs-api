'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};