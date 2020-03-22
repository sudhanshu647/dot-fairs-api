const httpStatus = require('http-status');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpirationInterval } = require('../../config/vars');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isNumeric: true,
        },
        required: [true, 'ID must be provided'],
      },
      name: {
        type: DataTypes.STRING(50),
      },
      mobile: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
        },
        required: [true, 'Mobile Number must be provided'],
      },
      email: {
        type: DataTypes.STRING(60),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      profile_img_link: {
        type: DataTypes.STRING(2048),
      },
      gender: {
        type: DataTypes.STRING(10),
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
        get() {
          return moment
            .utc(this.getDataValue('date_of_birth'))
            .format('DD-MM-YYYY');
        },
        set(val) {
          this.setDataValue('date_of_birth', new Date(val));
        },
      },
      password: {
        type: DataTypes.STRING(200),
      },
      otp: {
        type: DataTypes.INTEGER,
      },
      otp_expires_at: {
        type: DataTypes.DATE,
      },
      allow_networking: {
        type: DataTypes.BOOLEAN,
      },
      profile_name: {
        type: DataTypes.STRING(30),
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
    { tableName: 'users' }
  );

  User.prototype.validPassword = function(password) {
    return compareSync(password, this.password);
  };

  User.prototype.transform = function() {
    const transformed = {};
    const fields = [
      'id',
      'name',
      'gender',
      'email',
      'email_verified',
      'mobile',
      'created_at',
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  };

  (User.prototype.token = function() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, 'minutes')
        .unix(),
      iat: moment().unix(),
      sub: this.id,
    };
    return jwt.encode(playload, jwtSecret);
  }),
    (User.prototype.passwordMatches = async function(password) {
      return bcrypt.compare(password, this.password);
    }),
    // login by otp
    (User.findAndGenerateToken = async function(options) {
      const { mobile, otp, role, password, refreshObject } = options;

      if (!mobile) {
        throw new APIError({
          message: 'mobile number is required to generate a token',
        });
      }
      const user = await this.findOne({ where: { mobile } });
      const err = {
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
      };
      if (otp) {
        if (user && otp === user.otp) {
          if (moment() < user.otp_expires_at) {
            return { success: true, user, accessToken: user.token() };
          }
          err.message = 'otp expired!';
        } else err.message = 'Incorrect mobile or otp';
      } else if (password) {
        if (user && (await user.passwordMatches(password))) {
          return { user, accessToken: user.token() };
        }
        err.message = 'Incorrect mobile or password';
      } else if (refreshObject && refreshObject.user_mobile === mobile) {
        if (moment(refreshObject.expires).isBefore()) {
          err.message = 'Invalid refresh token.';
        } else {
          return { user, accessToken: user.token() };
        }
      } else {
        err.message = 'Incorrect mobile or refreshToken';
      }
      return { error: err };
      // throw new APIError(err);
    }),
    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {Error} error
     * @returns {Error|APIError}
     */
    (User.checkDuplicateMobile = error => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return new APIError({
          message: 'Validation Error',
          errors: [
            {
              field: 'mobile',
              location: 'body',
              messages: ['"mobile" already exists'],
            },
          ],
          status: httpStatus.CONFLICT,
          isPublic: true,
          stack: error.stack,
        });
      }
      return error;
    });

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
