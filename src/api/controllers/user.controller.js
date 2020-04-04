const httpStatus = require('http-status');
const { omit } = require('lodash');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const db = require('../models');
const APIError = require('../utils/APIError');
const {
  awsSecretAccessKey,
  awsAccessKeyId,
  awsRegion,
  s3Bucket,
} = require('../../config/vars');

const { User } = db;

aws.config.update({
  secretAccessKey: awsSecretAccessKey,
  accessKeyId: awsAccessKeyId,
  region: awsRegion,
});
const s3 = new aws.S3();

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

// save cook profile picture
exports.userImgUpload = async (req, res, next) => {
  try {
    const upload = multer({
      storage: multerS3({
        s3,
        bucket: `${s3Bucket}/images/user-image/${req.user.id}`,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        cacheControl: 'max-age=2592000',
        acl: 'public-read',
        // eslint-disable-next-line object-shorthand
        key: function(_req, file, cb) {
          const extArray = file.mimetype.split('/');
          const extension = extArray[extArray.length - 1];
          cb(null, `profile-img.${extension}`);
        },
      }),
    });
    const singleUpload = upload.single('image');
    singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'File Upload Error', detail: err.message }],
        });
      }
      User.update(
        { profile_img_link: `${req.file.location}?v=${Date.now()}` },
        { where: { id: req.user.id } }
      ).then(
        res.json({
          success: true,
          data: { imgage_url: `${req.file.location}?v=${Date.now()}` },
        })
      );
    });
  } catch (error) {
    next(error);
  }
};
