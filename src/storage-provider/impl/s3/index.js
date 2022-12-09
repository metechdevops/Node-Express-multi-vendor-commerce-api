import AWS from "aws-sdk";
import config from './../../../config/config';

AWS.config.update({
    accessKeyId: config.awsS3.access_key,
    secretAccessKey: config.awsS3.secret_key,
    region: config.awsS3.region,
});

module.exports = AWS;
