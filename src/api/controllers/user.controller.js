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
    User.findOne({
      attributes: [
        'id',
        'name',
        'profile_name',
        'email',
        'address',
        'mobile',
        'company',
        'designation',
        'about',
        'allow_networking',
        'profile_img_link',
      ],
      where: { id: req.user.id },
    })
      .then(user => res.json({ user }))
      .catch(e => next(e));
  } catch (error) {
    next(error);
  }
};

exports.updateProfileDetails = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name || null,
      profile_name: req.body.profile_name,
      email: req.body.email,
      address: req.body.address,
      company: req.body.company,
      designation: req.body.designation,
      about: req.body.about,
      allow_networking: req.body.allow_networking,
    };
    // check email is available or not
    if (userData.email != null) {
      const emailfind = await User.findOne({
        attributes: ['id', 'mobile'],
        where: { email: userData.email },
      });
      if (emailfind != null) {
        if (emailfind.mobile !== req.user.mobile) {
          throw new APIError({
            message: 'Email ID already registerd by another person',
            status: httpStatus.CONFLICT,
          });
        }
      }
    }

    User.update(
      {
        name: req.body.name || null,
        profile_name: req.body.profile_name,
        email: req.body.email,
        address: req.body.address,
        company: req.body.company,
        designation: req.body.designation,
        about: req.body.about,
        allow_networking: req.body.allow_networking,
      },
      { where: { id: req.user.id } }
    )
      .then(res.json({ message: 'update successfully' }))
      .catch(e => next(e));
  } catch (error) {
    next(error);
  }
};
