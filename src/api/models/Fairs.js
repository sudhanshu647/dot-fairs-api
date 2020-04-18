module.exports = (sequelize, DataTypes) => {
  const Fairs = sequelize.define(
    'Fairs',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(60),
        trim: true,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        trim: true,
      },
      venue: {
        allowNull: false,
        type: DataTypes.STRING(60),
        trim: true,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING(60),
        trim: true,
      },
      website_link: {
        type: DataTypes.STRING(2048),
        trim: true,
      },
      description: {
        type: DataTypes.TEXT,
        trim: true,
      },
      no_of_exhibitors: {
        type: DataTypes.TINYINT,
      },
      exhibitors_list: {
        type: DataTypes.STRING,
        trim: true,
      },
      book_tickets_link: {
        type: DataTypes.STRING(2048),
        trim: true,
      },
      image_link: {
        type: DataTypes.STRING(2048),
        trim: true,
      },
      start_time: {
        type: DataTypes.TIME,
        trim: true,
      },
      end_time: {
        type: DataTypes.TIME,
        trim: true,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        trim: true,
      },
      check_in_link: {
        type: DataTypes.STRING(2048),
        trim: true,
      },
      email_id: {
        type: DataTypes.STRING(60),
        trim: true,
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
    { tableName: 'fairs' }
  );
  // eslint-disable-next-line no-unused-vars
  Fairs.associate = function(models) {
    // associations can be defined here
  };
  return Fairs;
};
