const httpStatus = require('http-status');
const { omit } = require('lodash');
const db = require('../models');
const APIError = require('../utils/APIError');

const { User } = db;

/**
 * Get logged in user info
 * @public
 */
// exports.loggedIn = async (req, res) => res.json(req.user.transform());

exports.loggedIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
