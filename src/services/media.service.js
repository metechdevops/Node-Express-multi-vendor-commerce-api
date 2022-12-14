
import _ from "lodash";

// Utils
import catchAsync from '../utils/catchAsync';
import {imageUploads,fileFilter} from '../utils/media';


/**
 * @desc    Create New Order
 * @param   { Object } body - Body object data
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|order> }
 */
export const createMedia = catchAsync(async (req) => {
  
    const {params,files, user} = req;
    const fileValidationError = await fileFilter(req,files)

    // 4) Check file Validate method
    if (fileValidationError) {
      return {
        type: 'Error',
        message: 'invalidImageFormate',
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


