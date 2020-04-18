const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/fair.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} /fairs   Get All fairs Details
   * @apiDescription Get All fairs Details
   * @apiVersion 1.0.0
   * @apiName Get Get All fairs Details
   * @apiGroup Fairs
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Integer}  id          fair  id
   * @apiSuccess {String}   name        fair name
   * @apiSuccess {String}   venue      fair venue
   * @apiSuccess {string}   date       fair date
   * @apiSuccess {integer}  start_time     fair start_time
   * @apiSuccess {boolean}  end_time      fair end time
   * @apiSuccess {String}   category      fair category
   * @apiSuccess {String}   image_link    fair image
   * @apiSuccess {String}   book_tickets_link      fair  booking tickets link
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.fairsList);

router
  .route('/:fair_id')
  /**
   * @api {get} /fairs/:fair_id   Get fair Details by fair id
   * @apiDescription Get fair Details by fair id
   * @apiVersion 1.0.0
   * @apiName Get fair Details by fair id
   * @apiGroup Fairs
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Integer}  id          fair  id
   * @apiSuccess {String}   name        fair name
   * @apiSuccess {String}   venue      fair venue
   * @apiSuccess {string}   date       fair date
   * @apiSuccess {integer}  start_time     fair start_time
   * @apiSuccess {boolean}  end_time      fair end time
   * @apiSuccess {String}   category      fair category
   * @apiSuccess {String}   image_link    fair image
   * @apiSuccess {String}   book_tickets_link      fair  booking tickets link
   * @apiSuccess {boolean}  check_in_link      fair check in link
   * @apiSuccess {String}   website_link      website_link
   * @apiSuccess {String}   email_id    fair email_id
   * @apiSuccess {boolean}  description      fair description
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.fairDetails);

router
  .route('/bookmark/:fair_id')

  /**
   * @api {post} /fairs/bookmark/:fair_id   create bookmark a fair by fair id
   * @apiDescription bookmark a fair by fair id
   * @apiVersion 1.0.0
   * @apiName bookmark a fair by fair id
   * @apiGroup Fairs
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}   message   fair bookmarked
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(), controller.bookmarkFair);

/**
 * @api {post} /user/upload-profile-img   upoad user profile image
 * @apiDescription upload user image
 * @apiVersion 1.0.0
 * @apiName upload user profile image
 * @apiGroup User
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam   {Image}    image       User profile image
 *
 * @apiSuccess {String}   image_url   user profle image access url
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
// .get(authorize(), controller.fairDetails)

module.exports = router;
