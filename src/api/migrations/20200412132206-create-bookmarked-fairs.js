module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('bookmarked_fairs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fair_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('bookmarked_fairs'),
};
