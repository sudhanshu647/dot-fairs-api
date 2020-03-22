const httpStatus = require('http-status');
const { omit } = require('lodash');
const axios = require('axios');
const moment = require('moment-timezone');
const { User, RefreshToken } = require('../models');
const { jwtExpirationInterval } = require('../../config/vars');

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

// new login api  createUser
exports.createUser = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    let user = await User.findOne({ where: { mobile } });
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiresAt = moment()
      .add(5, 'minutes')
      .toDate();
    if (user) {
      // if  user exist
      const data = {
        otp,
        otp_expires_at: otpExpiresAt,
      };
      await User.update(data, { where: { mobile } });
    } else {
      // if user not exist
      try {
        const data = {
          otp,
          otp_expires_at: otpExpiresAt,
          mobile,
        };
        user = await User.create(data);
      } catch (error) {
        return next(error);
      }
    }
    // return res.json({ success: true, data: { type: 'otp' } });
    axios({
      method: 'post',
      url: 'https://www.fast2sms.com/dev/bulk',
      data: {
        sender_id: 'FSTSMS',
        language: 'english',
        route: 'qt',
        numbers: user.mobile,
        message: '25069',
        variables: '{#BB#}',
        variables_values: otp,
      },
      headers: {
        'cache-control': 'no-cache',
        authorization:
          'j3l6nZVFkbCvsSQB5eARPfYEGtJ9u1qiM2DUW7ygzTwON0cKdrw3lGUcxiJP5B9Fqrapgb0thCEL1Nsv',
      },
    })
      .then(response => {
        if (response.status === 200) {
          return res.json({ success: true, data: { type: 'otp' } });
        }
        console.log(response.body);
        return res.json({ success: false });
      })
      .catch(error => res.json({ success: false, data: { type: 'otp' } }));
  } catch (error) {
    return next(error);
  }
};

// otp verification
exports.otpVerify = async (req, res, next) => {
  try {
    const { error, user, accessToken } = await User.findAndGenerateToken(
      req.body
    );
    if (error) {
      req.err = error;
      return next(error);
    }
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { mobile, refresh_token } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      user_mobile: mobile,
      token: refresh_token,
    });
    const { user, accessToken } = await User.findAndGenerateToken({
      mobile,
      refreshObject,
    });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
