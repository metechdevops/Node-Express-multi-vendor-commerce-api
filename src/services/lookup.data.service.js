// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { Category } from '../models/index';
import { unitType } from '../models/index';


/**
 * @desc    Query lookup data
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|lookup> }
 */
export const queryLookupData = catchAsync(async (req) => {

  // 1) Get all categories data
  const categories = await Category.find()

  // 2) Get all units data
  const unitTypes = await unitType.find()

  const data = {
    categories,
    unitTypes
  }

  // 3) If everything is OK, send lookup data
  return {
    type: 'Success',
    message: 'successfulLookupDataFound',
    statusCode: 200,
    data
  };
  
});






