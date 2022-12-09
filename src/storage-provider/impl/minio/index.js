const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint: env.minioClient,
    port: env.minioPort || 9000,
    useSSL: env.useMinioSsl,
    accessKey: (env.minioAccessKey || 'minioadmin'),
    secretKey: (env.minioSecretKey || 'minioadmin')
});

module.exports = minioClient;