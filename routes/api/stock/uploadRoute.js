const express = require('express');
const router = express.Router();
const passport = require('passport');
const AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
const uuid = require('uuid/v1');
const multiparty = require('multiparty');
const cloudinary = require('cloudinary');
const accessKeyId = require('../../../config/Keys').api_key;
const secretAccessKey = require('../../../config/Keys').api_secret;
// multer DiskStorage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null, // windows upload path to store the image.
      '/Users/malik.TBWAZEENAH/Desktop/fullstack Projects/fusion-mern/tmp/uploads'
    );
  },
  filename: function(req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    // below will not change the name but will put originalname + date
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// Multer upload all in one configured here rather than in router.
const upload = multer({
  storage: storage
  // filesize limit can be configured in bytes.
  // limits: { filesize: 100000000 }
}).any('files');

// Cloudinary Config
cloudinary.config({
  cloud_name: 'malikgen',
  api_key: accessKeyId,
  api_secret: secretAccessKey
});
// testing Brad Traversy style of multer usage.
router.post('/', (req, res) => {
  // here multer comes second so we can get the res from multer upload.
  upload(req, res, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.files);
    }
  });
});
// router.post('/', upload.any('files'), (req, res) => {
//   // const form = new multiparty.Form();
//   // if its single then req.file will be the file we are looking for.
//   console.log(req.files);
//   console.log(req.body);

//   // below is suitable with postman --- NEED TO USE MULTER TO STORE IT IN LOCAL STORAGE AND THEN UPLOAD.
//   // cloudinary.v2.uploader.upload(req.files, (err, response) => {
//   //   console.log(response, err);
//   //   // res.json(res);
//   // });
//   // .catch(err => {
//   //   res.status(400).send(err);
//   // });
// });

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
