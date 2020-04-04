const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize } = require('../../middlewares/auth');
const { updateUserDetails } = require('../../validations/user.validation.js');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} /user   Get User information
   * @apiDescription Get logged in User information
   * @apiVersion 1.0.0
   * @apiName User_information
   * @apiGroup User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Integer}  id          User  id
   * @apiSuccess {String}   name        User name
   * @apiSuccess {String}   gender      User gender
   * @apiSuccess {string}   email       User email
   * @apiSuccess {integer}  mobile      User mobile
   * @apiSuccess {boolean}  email_verified      User email_verified or not
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.loggedIn)

  /**
   * @api {get} /user   update User information
   * @apiDescription update user profile details
   * @apiVersion 1.0.0
   * @apiName update user details
   * @apiGroup User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Integer}  id          User  id
   * @apiSuccess {String}   name        User name
   * @apiSuccess {String}   gender      User gender
   * @apiSuccess {string}   email       User email
   * @apiSuccess {integer}  mobile      User mobile
   * @apiSuccess {boolean}  email_verified      User email_verified or not
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .put(
    authorize(),
    validate(updateUserDetails),
    controller.updateProfileDetails
  );

module.exports = router;
