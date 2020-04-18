const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize } = require('../../middlewares/auth');
const { updateUserDetails } = require('../../validations/user.validation.js');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} /user   Get User Profile Details
   * @apiDescription Get User Profile Details
   * @apiVersion 1.0.0
   * @apiName Get User Profile Details
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
   * @api {put} /user   update User information
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

router
  .route('/upload-profile-img')
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
  .post(authorize(), controller.userImgUpload);

// router
//   .route('/bookmarked-fairs')
//   /**
//    * @api {post} /user/upload-profile-img   upoad user profile image
//    * @apiDescription upload user image
//    * @apiVersion 1.0.0
//    * @apiName upload user profile image
//    * @apiGroup User
//    *
//    * @apiHeader {String} Authorization   User's access token
//    *
//    * @apiParam   {Image}    image       User profile image
//    *
//    * @apiSuccess {String}   image_url   user profle image access url
//    *
//    * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
//    */
//   .get(authorize(), controller.fairsList);

module.exports = router;
