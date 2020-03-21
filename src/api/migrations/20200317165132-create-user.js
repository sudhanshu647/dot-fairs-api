const moment = require("moment-timezone");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      mobile: {
        allowNull: false,
        unique: true,
        type: Sequelize.BIGINT
      },
      email: {
        unique: true,
        type: Sequelize.STRING(60)
      },
      profile_img_link: {
        type: Sequelize.STRING(2048)
      },
      gender: {
        type: Sequelize.STRING(20)
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        validate: { isDate: true },
        get() {
          return moment
            .utc(this.getDataValue("date_of_birth"))
            .format("DD-MM-YYYY");
        },
        set(val) {
          this.setDataValue("date_of_birth", new Date(val));
        }
      },
      password: {
        //allowNull: false,
        type: Sequelize.STRING(200)
      },
      otp: {
        type: Sequelize.INTEGER(6)
      },
      otp_expires_at: {
        type: Sequelize.DATE
      },
      allow_networking: {
        type: Sequelize.BOOLEAN
      },
      profile_name: {
        type: Sequelize.STRING(30)
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
    return queryInterface.dropTable("users");
  }
};
