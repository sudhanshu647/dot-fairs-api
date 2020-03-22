/* eslint-disable no-unused-expressions */
const crypto = require('crypto');
const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      token: DataTypes.STRING,
      user_id: DataTypes.BIGINT,
      user_mobile: DataTypes.BIGINT,
      expires: DataTypes.DATE,
    },
    { tableName: 'refresh_tokens' }
  );

  (RefreshToken.generate = user => {
    const user_id = user.id;
    const user_mobile = user.mobile;
    const token = `${user_id}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment()
      .add(30, 'days')
      .toDate();
    const tokenObject = new RefreshToken({
      token,
      user_id,
      user_mobile,
      expires,
    });
    tokenObject.save();
    return tokenObject;
  }),
    (RefreshToken.findOneAndRemove = async function(options) {
      const refreshToken = await this.findOne({ where: options }).catch(e => {
        console.log(e.message);
      });
      // console.log('refreshToken', refreshToken);
      const tokenObject = refreshToken;
      if (!refreshToken) {
        console.log('err', { where: options });
      } else {
        refreshToken.destroy();
      }
      return tokenObject;
    }),
    (RefreshToken.associate = function(models) {
      // associations can be defined here
    });
  return RefreshToken;
};
