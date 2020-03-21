const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isNumeric: true
        },
        required: [true, "ID must be provided"]
      },
      name: {
        type: DataTypes.STRING(50)
      },
      mobile: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true
        },
        required: [true, "Mobile Number must be provided"]
      },
      email: {
        type: DataTypes.STRING(60),
        unique: true,
        validate: {
          isEmail: true
        }
      },
      profile_img_link: {
        type: DataTypes.STRING(2048)
      },
      gender: {
        type: DataTypes.STRING(10)
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true
        },
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
        type: DataTypes.STRING(200)
      },
      otp: {
        type: DataTypes.INTEGER
      },
      otp_expires_at: {
        type: DataTypes.DATE
      },
      allow_networking: {
        type: DataTypes.BOOLEAN
      },
      profile_name: {
        type: DataTypes.STRING(30)
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    { tableName: "users" }
  );

  User.beforeCreate(user => {
    // pass=req.body.password;
    if (user.password) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
