// Packages
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk'

import AppError from './appError';

const storage = multer.memoryStorage();


// SET S3 CREDENTIAL
aws.config.update({
  secretAccessKey: process.env.AWS_SECRETKEY || "rdL6oy2nnTPZj7SmHSb/XYWtuuwlrfRAqKnYd66t",
  accessKeyId: process.env.AWS_ACCESSKEYID || "AKIAUVFWHA4INDOZQ2YD",
  region: process.env.AWS_REGION || "eu-west-1"
});

// CREATE OBJECT FOR S3
const s3 = new aws.S3();

const limits = {
  files: 1, // allow only 1 file per request
  fileSize: 1024 * 1024 * 10 // 10 MB (max file size)
};

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(
      new AppError('Not an image! Please upload only images', 400),
      false
    );
  }
  cb(null, true);
};

/**
 * Upload single image
 * @param {String} name
 */
export const singleFile = (name) => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter
  }).single(name);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new AppError(`Cannot Upload More Than 1 Image`, 500));
      }
    }

    if (err) return next(new AppError(err, 500));
    next();
  });
};



/**
 * Upload any number of images with any name
 */
export const anyMulter = () => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter
  }).any();

  upload(req, res, (err) => {
    if (err) return next(new AppError(err, 500));
    next();
  });
};


/**
 * S3 Upload single image
 * @param {String} name
 */
 export const s3SingleFile = () => (req, res, next) => {
  
  // const upload = multer({
  //   fileFilter,
  //   limits,
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: 'e-cart-dev',
  //     acl: 'public-read',
  //     cacheControl: 'max-age=31536000',
  //     metadata: function (req, file, cb) {
  //       cb(null, {fieldName: file.fieldname});
  //     },
  //     key: function (req, file, cb) {
  //       cb(null, Date.now().toString())
  //     }
  //   }),
  // })

  const upload = multer({
    // fileFilter,
    // limits:{
    //   files: 1, // allow only 1 file per request
    //   fileSize: 1024 * 1024 * 10 // 10 MB (max file size)
    // },
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: process.env.AWS_BUCKET || "e-cart-dev",
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
      },
      key: function (req, file, cb) {
        let path = '';
        // let filename = Date.now().toString()+'.'+mime.extension(file.mimetype);
        // if (req.query.module) {
        //   let dir_path = process.env.AWS_DIRECTORY_PATH;
        //   dir_path = dir_path.substring(0, dir_path.indexOf("/")) + `/${req.query.module}/`;
        //   path = dir_path + filename;
        // } else {
        //   path = process.env.AWS_DIRECTORY_PATH + filename;
        //   cb(null, path);
        // }
      }
    })
  });

  // upload(req, res, (err) => {
  //   if (err instanceof multerS3.MulterError) {
  //     if (err.code === 'LIMIT_UNEXPECTED_FILE') {
  //       return next(new AppError(`S3 | Cannot Upload More Than 1 Image`, 500));
  //     }
  //   }

  //   if (err) return next(new AppError(err, 500));
  //   next();
  // });

  // uploadImage: function (req, res, key, callback) {
    const singleUpload = upload.single();
    singleUpload(req, res, function(err) {
      console.log(err)
      // if (err) 
        // callback({error: {title: 'File Upload Error', detail: err.message}});
      // else 
        // callback(null, {url: req.file.location, key: req.file.key});
    });

};


// module.exports = {
//   uploadImage: function (req, res, key, callback) {
//   const singleUpload = upload.single(key);
//   singleUpload(req, res, function(err) {
//   if (err) {
//   callback({error: {title: 'File Upload Error', detail: err.message}});
//   } else {
//   callback(null, {url: req.file.location, key: req.file.key});
//   });
//   };


/**
 * S3 Upload Many number of images with any name
 */
 export const anyMulterS3 = () => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter
  }).any();

  upload(req, res, (err) => {
    if (err) return next(new AppError(err, 500));
    next();
  });
};
