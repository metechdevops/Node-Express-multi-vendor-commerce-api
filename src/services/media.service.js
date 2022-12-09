
import _ from "lodash";

// Utils
import catchAsync from '../utils/catchAsync';
import {imageUploads} from '../utils/media';

// Configs
import config from '../config/config';


/**
 * @desc    Create New Order
 * @param   { Object } body - Body object data
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|order> }
 */
export const createMedia = catchAsync(async ({params,files, user}) => {
  
    // 1) Extract data from parameters
    const {type,platform} = params;

    if (_.isEmpty(type) || _.isEmpty(platform)) {
      return {
        type: 'Error',
        message: 'noProductFound',
        statusCode: 404
      };
    }

    const medias = await imageUploads(files,type,platform)


    // 5) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulOrderCreate',
      statusCode: 200,
      medias
    };

});


