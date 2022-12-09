import _ from "lodash";
import AWS from  "./index";
import { v4 as uuidv4 } from 'uuid';
import config from './../../../config/config';

module.exports = class S3Storage {
  constructor() {
    this.s3Instance = new AWS.S3();
  }
  async saveFile(uploadedFile, fileName = null, directory = 'uploads') {
    const ext = uploadedFile.originalname.split(".").pop();
    if (_.isNull(fileName)) {
      fileName = uuidv4() + "." + ext;
    }
    
    const params = {
      Bucket: directory ? config.awsS3.bucket + "/" + directory : config.awsS3.bucket,
      Key: fileName,
      Body: uploadedFile.buffer,
    };

    return this.s3Instance.upload(params).promise();
  }

  async saveFiles(files, directory) {
    let uploadPromises = [];
    if (files) {
      uploadPromises = files.map((file) => this.saveFile(file, null, directory));
    }
    return Promise.all(uploadPromises);
  }
  async removeFile(fileName, directory) {
    const params = {
      Bucket: env.bucket,
      Key: fileName,
    };
    return this.s3Instance.deleteObject(params).promise();
  }
};
