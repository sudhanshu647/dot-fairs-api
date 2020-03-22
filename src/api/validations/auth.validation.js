const Joi = require('@hapi/joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      mobile: Joi.string()
        .regex(/^\d{3}\d{3}\d{4}$/)
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
    },
  },

  // POST /v1/auth/login
  login: {
    body: {
      mobile: Joi.string()
        .regex(/^\d{3}\d{3}\d{4}$/)
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
    },
  },

  createUser: {
    body: {
      mobile: Joi.string()
        .regex(/^\d{3}\d{3}\d{4}$/)
        .required(),
      // otp:    Joi.number().required().min(6).max(128),
    },
  },

  otpVerify: {
    body: {
      mobile: Joi.string()
        .regex(/^\d{3}\d{3}\d{4}$/)
        .required(),
      otp: Joi.number(),
      password: Joi.string(),
    },
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required(),
    },
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      mobile: Joi.number().required(),
      refresh_token: Joi.string().required(),
    },
  },
};
