module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      venue: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      website_link: {
        type: Sequelize.STRING(2048)
      },
      description: {
        type: Sequelize.TEXT
      },
      no_of_exhibitors: {
        type: Sequelize.STRING
      },
      exhibitors_list: {
        type: Sequelize.STRING
      },
      book_tickets_link: {
        type: Sequelize.STRING(2048)
      },
      image_link: {
        type: Sequelize.STRING(2048)
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      check_in_link: {
        type: Sequelize.STRING(2048)
      },
      email_id: {
        type: Sequelize.STRING(60)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("events");
  }
};
