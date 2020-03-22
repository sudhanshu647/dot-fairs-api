const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const {
  createUser,
  otpVerify,
  refresh,
} = require('../../validations/auth.validation');

const router = express.Router();

router
  .route('/generate-otp')
  /**
   * @api {post} /auth/generate-otp Generate OTP
   * @apiDescription this api require a mobile number and it will create a user in the database
   * and also send the otp on user mobile number.
   * @apiVersion 1.0.0
   * @apiName CreateNewUser
   * @apiGroup Auth
   * @apiPermission public
   *
   * @apiParam  {String{10}}             mobile    User's mobile number is required to genrate an OTP
   *
   * @apiSuccess (Created 201) {user}    mobile              user mobile
   * @apiSuccess (Created 201) {user}    OTP                 user recive an otp
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   *
   */
  .post(validate(createUser), controller.createUser);

router
  .route('/login-and-signup')
  /**
   * @api {post} /auth/login-and-signup  Login and Signup
   * @apiDescription this api require a mobile number and OTP
   * and it will check mobile number and otp correct or not and also check OTP expired or not.
   *  If mobile number and otp  is valid and otp is not expire then
   * it will genrate a access and refresh token for user login.
   * @apiVersion 1.0.0
   * @apiName Login By Mobile And Otp
   * @apiGroup Auth
   * @apiPermission public
   *
   * @apiParam  {mobile{10}}         mobile      user registerd mobile number
   * @apiParam  {otp{4}}             otp         user valid OTP
   *
   * @apiSuccess  {String}  token.tokenType     Access Token's type
   * @apiSuccess  {String}  token.accessToken   Authorization Token
   * @apiSuccess  {String}  token.refreshToken  Token to get a new accessToken
   *                                                   after expiration time
   * @apiSuccess  {Number}  token.expiresIn     Access Token's expiration time
   *                                                   in miliseconds
   *
   * @apiSuccess  {String}  user.id             User's id
   * @apiSuccess  {String}  user.name           User's name
   * @apiSuccess  {Date}    user.createdAt      Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Incorrect mobile number or OTP
   */
  .post(validate(otpVerify), controller.otpVerify);

router
  .route('/refresh-token')
  /**
   * @api {post} /auth/refresh-token Refresh Token
   * @apiDescription Refresh expired accessToken
   * @apiVersion 1.0.0
   * @apiName RefreshToken
   * @apiGroup Auth
   * @apiPermission public
   *
   * @apiParam  {String}  mobile         User's mobile
   * @apiParam  {String}  refreshToken  Refresh token aquired when user logged in
   *
   * @apiSuccess {String}  tokenType     Access Token's type
   * @apiSuccess {String}  accessToken   Authorization Token
   * @apiSuccess {String}  refreshToken  Token to get a new accessToken after expiration time
   * @apiSuccess {Number}  expiresIn     Access Token's expiration time in miliseconds
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Incorrect mobile or refreshToken
   */
  .post(validate(refresh), controller.refresh);

module.exports = router;
