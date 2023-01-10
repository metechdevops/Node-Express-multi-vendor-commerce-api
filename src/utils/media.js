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

/**
 * @desc    Upload Document
 * @param   { Array } files - Document Media files data
 * @param   { String } directory - An client contains [customer, vendor, product, profile, driver, collection]
 * @param   { String } client - An client contains [web,mobile]
 * @returns { Object<type|message|statusCode|medias> }
 */

export const documentUpload = async (files, directory) => {

    const mediaDirectory = directory.toUpperCase();
    const [documents] = await uploadDocuments(files, mediaDirectory);
    return prepareDocResponse(documents);
};

const uploadDocuments = (files, directory) => {
    const storageProvider = getStorageProvider();
    return Promise.all([
        storageProvider.saveFiles(files,directory)
    ]);
}

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
            original: images[i].Location,
            web: thumbnailsForWeb[i].Location,
            mobile: thumbnailsForMobile[i].Location
        });
    }
    return response;
}

const prepareDocResponse = (documents) => {
    const response = [];
    documents.forEach(element => {
        response.push({
            link: element.Location,
            s3Id: String(element.ETag)
        });
    }); 

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

export const documentFilter = (req, files, cb) => {
    let isInValid = false
    files.map((file) => {
        if (!file.originalname.match(/\.(pdf|txt|doc|docx|csv|PDF|TXT|DOC|DOCX|CSV)$/)) {
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