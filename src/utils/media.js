import sharp from 'sharp';

const { getStorageProvider } = require("../storage-provider/storage-provider-factory");
const StorageDirectories = require("../storage-provider/storage-directories");
const ThumbnailsDimensions = require("../constants/thumbnail-dimensions");

/**
 * @desc    Upload images
 * @param   { Array } files - Media files data
 * @param   { String } media_type - An media_type contains types
 * @returns { Object<type|message|statusCode|medias> }
 */

 export const imageUploads = async (files, media_type, media_For) => {


    const mediaFor = media_For.toUpperCase();
    const type = media_type.toUpperCase();

    const [thumbnailDataForWeb, thumbnailDataForMobile] = await prepareThumbnailsData(files, type);
    const [images, thumbnailsForWeb, thumbnailsForMobile] = await uploadImages(files, mediaFor, thumbnailDataForWeb, thumbnailDataForMobile);

    return prepareResponseData(images, thumbnailsForWeb, thumbnailsForMobile);
};

const uploadImages = (files, mediaFor, thumbnailDataForWeb, thumbnailDataForMobile) => {
    const storageProvider = getStorageProvider();
    return Promise.all([
        storageProvider.saveFiles(files, StorageDirectories[mediaFor],mediaFor),
        storageProvider.saveFiles(thumbnailDataForWeb, StorageDirectories[mediaFor]),
        storageProvider.saveFiles(thumbnailDataForMobile, StorageDirectories[mediaFor])
    ]);
}

const  prepareThumbnailsData = (files, type) => {
    return Promise.all([
        prepareFileDataForThumbnail(files, ThumbnailsDimensions[type].forWeb),
        prepareFileDataForThumbnail(files, ThumbnailsDimensions[type].forMobile)
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

