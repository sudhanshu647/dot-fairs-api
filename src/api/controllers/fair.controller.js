const moment = require('moment-timezone');
const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { Fairs, BookmarkedFairs } = require('../models');
const APIError = require('../utils/APIError');

exports.fairsList = async (req, res, next) => {
  try {
    const whereStatement = {};

    if ('type' in req.query && req.query.type !== '') {
      const fiarsCategory = req.query.type.split(',');
      fiarsCategory.forEach(item => {
        if (item === 'featured') {
          whereStatement.featured = 1;
        } else if (item === 'upcoming') {
          whereStatement.date = {
            [Op.gte]: moment().format(),
          };
        }
      });
    }

    Fairs.findAll({
      attributes: [
        'id',
        'name',
        'venue',
        'date',
        'start_time',
        'end_time',
        'category',
        'image_link',
        'book_tickets_link',
      ],
      where: whereStatement,
    })
      .then(fairs => res.json({ success: true, data: { fairs } }))
      .catch(e => next(e));
  } catch (error) {
    next(error);
  }
};

exports.fairDetails = async (req, res, next) => {
  try {
    Fairs.findOne({
      attributes: [
        'id',
        'name',
        'venue',
        'date',
        'start_time',
        'end_time',
        'category',
        'image_link',
        'book_tickets_link',
        'check_in_link',
        'website_link',
        'email_id',
        'description',
      ],
      where: { id: req.params.fair_id },
    })
      .then(fair => res.json({ success: true, data: { fair } }))
      .catch(e => next(e));
  } catch (error) {
    next(error);
  }
};

// book mark a fair
exports.bookmarkFair = async (req, res, next) => {
  try {
    const { type } = req.body;
    if (type === 'bookmark') {
      const BookmarkedFairsObj = BookmarkedFairs.findOne({
        where: {
          fair_id: req.params.fair_id,
          user_id: req.user.id,
        },
      });
      if (BookmarkedFairsObj == null) {
        BookmarkedFairs.create({
          fair_id: req.params.fair_id,
          user_id: req.user.id,
        })
          .then(res.json({ success: true, data: { message: 'bookmarked' } }))
          .catch(e => next(e));
      } else {
        throw new APIError({
          message: 'This fair already Bookmarked',
          status: httpStatus.CONFLICT,
        });
      }
    } else if (type === 'unbookmark') {
      BookmarkedFairs.destroy({
        where: {
          fair_id: req.params.fair_id,
          user_id: req.user.id,
        },
      }).then(res.json({ success: true, data: { message: 'unbookmarked' } }));
    }
  } catch (error) {
    next(error);
  }
};
