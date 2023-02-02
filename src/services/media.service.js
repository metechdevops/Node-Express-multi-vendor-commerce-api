
import _ from "lodash";

// Utils
import catchAsync from '../utils/catchAsync';
import {
  imageUploads,
  documentUpload,
  fileFilter,
  documentFilter,
} from '../utils/media';


/**
 * @desc    Create New Order
 * @param   { Object } body - Body object data
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|order> }
 */
export const createMedia = catchAsync(async (req) => {
  
    const {params,files, user} = req;


    const {invalidFormate,message} = await fileFilter(req,files)

    // 4) Check file Validate method
    if (invalidFormate) {
      return {
        type: 'Error',
        message: message,
        statusCode: 400
      };  
    }

    // 1) Extract data from parameters
    const {directory,client} = params;
    const medias = await imageUploads(files,directory,client,user)

 
    // 5) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulMediaUploaded',
      statusCode: 200,
      medias
    };

});

/**
 * @desc    Create New Order
 * @param   { Object } body - Body object data
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|order> }
 */
export const createDocumentMedia = catchAsync(async (req) => {
  
  const {params,files} = req;
  const {invalidFormate,message} = await documentFilter(req,files)



  // 1) Check required document length.
  if(files.length < 1){

    return {
      type: 'Error',
      message: 'noAttachmentFound',
      statusCode: 400,
      errors: {}
    };
  }

  // 4) Check file Validate method
  if (invalidFormate) {
    return {
      type: 'Error',
      message: message,
      statusCode: 400
    };  
  }

  // 1) Extract data from parameters
  const {directory} = params;
  const medias = await documentUpload(files,directory)


  // 5) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulMediaUploaded',
    statusCode: 200,
    medias
  };

});


