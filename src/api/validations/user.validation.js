const Joi = require('@hapi/joi');

module.exports = {
  // POST /v1/auth/register
  updateUserDetails: {
    body: {
      name: Joi.string().required(),
      profile_name: Joi.string(),
      email: Joi.string().email(),
      address: Joi.string().required(),
      company: Joi.string(),
      designation: Joi.string(),
      about: Joi.string(),
      // allow_networking: Joi.boolean().required(),
    },
  },
};
