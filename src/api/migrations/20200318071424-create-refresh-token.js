module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.BIGINT,
      },
      user_mobile: {
        type: Sequelize.BIGINT,
      },
      expires: {
        type: Sequelize.DATE,
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
  down: queryInterface => queryInterface.dropTable('refresh_tokens'),
};
