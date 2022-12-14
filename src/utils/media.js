import sharp from 'sharp';

const { getStorageProvider } = require("../storage-provider/storage-provider-factory");
const StorageDirectories = require("../storage-provider/storage-directories");
const ThumbnailsDimensions = require("../constants/thumbnail-dimensions");
import AppError from './appError';

/**
 * @desc    Upload images
 * @param   { Array } files - Media files data
 * @param   { String } directory - An client contains [customer, vendor, product, profile, driver, collection]
 * @param   { String } client - An client contains [web,mobile]
 * @returns { Object<type|message|statusCode|medias> }
 */

 export const imageUploads = async (files, directory, client,user) => {


    const mediaDirectory = directory.toUpperCase();
    const mediaClinet = client.toUpperCase();

    const [thumbnailDataForWeb, thumbnailDataForMobile] = await prepareThumbnailsData(files, mediaDirectory);
    const [images, thumbnailsForWeb, thumbnailsForMobile] = await uploadImages(files, directory, thumbnailDataForWeb, thumbnailDataForMobile);

    return prepareResponseData(images, thumbnailsForWeb, thumbnailsForMobile);
};

const uploadImages = (files, directory, thumbnailDataForWeb, thumbnailDataForMobile) => {
    const storageProvider = getStorageProvider();
    return Promise.all([
        storageProvider.saveFiles(files,directory),
        storageProvider.saveFiles(thumbnailDataForWeb,directory),
        storageProvider.saveFiles(thumbnailDataForMobile,directory)
    ]);
}

const  prepareThumbnailsData = (files, type) => {
    return Promise.all([
        prepareFileDataForThumbnail(files, ThumbnailsDimensions[type].web),
        prepareFileDataForThumbnail(files, ThumbnailsDimensions[type].mobile)
    ]);
}

const prepareFileDataForThumbnail =  async(files, ThumbnailsDimensions) => {
    const thumbnailData = [];
    for (let file of files) {
        const buffer = await sharp(file.buffer).resize(ThumbnailsDimensions.Width, ThumbnailsDimensions.Height).toBuffer();
        thumbnailData.push({
            originalname: file.originalname,
            buffer
        });
    }
    return thumbnailData;
}

const prepareResponseData = (images, thumbnailsForWeb, thumbnailsForMobile) => {
    const response = [];
    for (let i = 0; i < images.length; i++) {
        response.push({
            orignalImage: images[i].Location,
            thumbnailImageForWeb: thumbnailsForWeb[i].Location,
            thumbnailImageForMobile: thumbnailsForMobile[i].Location
        });
    }
    return response;
}

export const fileFilter = (req, files, cb) => {
    let isInValid = false 
    files.map((file) => {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            isInValid = true;
        }
    })

    return isInValid;
};

export const limits = {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024 * 10 // 10 MB (max file size)
};