const express = require('express');
const router = express.Router();
const passport = require('passport');
const AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
const uuid = require('uuid/v1');
const multiparty = require('multiparty');
const accessKeyId = require('../../../config/Keys').accessKeyId;
const secretAccessKey = require('../../../config/Keys').secretAccessKey;

// S3 AWS Config
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
  // region: 'us-east-2'
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 's3-malik',
    // contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString());
    }
  })
});
router.post('/', (req, res) => {
  const form = new multiparty.Form();
  console.log(req.file);
});

// router.post('/', upload.single('file', 3), function(req, res, next) {
//   console.log(req.file);
//   res.send('Successfully uploaded ' + req.files.length + ' files!');
// });

// S3 PreSigned URL Route for any request STEPHEN GRIDER WAY to Get SignedURL
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
      Bucket: 's3-malik'
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
        Bucket: 's3-malik',
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
