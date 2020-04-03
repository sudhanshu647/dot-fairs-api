module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    'event',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};
// test
// test
