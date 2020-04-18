/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const BookmarkedFairs = sequelize.define(
    'BookmarkedFairs',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fair_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { tableName: 'bookmarked_fairs' }
  );
  BookmarkedFairs.associate = function(models) {
    // associations can be defined here
  };
  return BookmarkedFairs;
};
