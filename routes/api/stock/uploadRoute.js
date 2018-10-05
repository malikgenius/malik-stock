const express = require('express');
const router = express.Router();
const passport = require('passport');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const accessKeyId = require('../../../config/Keys').accessKeyId;
const secretAccessKey = require('../../../config/Keys').secretAccessKey;

// S3 AWS Config
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
});
// S3 PreSigned URL Route for any request
//@ Get Request for presigned URL from AWS
router.get(
  '/',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    // const key = `${req.user.id}/${uuid()}.jpeg`;
    const key = `abc/${uuid()}.jpeg`;
    const params = {
      Bucket: 'malik-mern-s3'
    };
    // checking if s3 bucket is accessible
    // s3.headBucket(params, (err, data) => {
    //   if (err) {
    //     console.log(err, err.stack);
    //   } else console.log(data);
    // });

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'malik-mern-s3',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  }
);

module.exports = router;
