const minioClient = require("./index");
const {v4: uuid} = require("uuid");
const {min} = require("lodash");

module.exports = class MinioStorage {
    async assertBucket(bucketName) {
        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
            await minioClient.makeBucket(bucketName);
        }
    }

    async readFile(fileName, directory) {
        return minioClient.getObject(this.getBucketName(directory), fileName);
    }

    async saveFile(uploadedFile, directory) {
        const bucketName = this.getBucketName(directory);

        const ext = uploadedFile.originalname.split(".").pop();
        const uuidFileName = uuid() + "." + ext;

        await this.assertBucket(bucketName);
        await minioClient.putObject(bucketName, uuidFileName, uploadedFile.buffer);

        return uuidFileName;
    }

    async removeFile(fileName, directory) {
        return minioClient.removeObject(this.getBucketName(directory), fileName);
    }

    getBucketName(dir) {
        return env.bucket + "-" + dir;
    }
};
