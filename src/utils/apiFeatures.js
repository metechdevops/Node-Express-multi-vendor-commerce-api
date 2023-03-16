// Utils
import catchAsync from './catchAsync';
import AppError from './appError';

const apiFeatures = catchAsync(async (req, model, populate) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'filter'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = model.find(JSON.parse(queryStr));
  const totalRecords = await model.countDocuments(JSON.parse(queryStr));

  if (!query) {
    throw new AppError('No Data Found', 400);
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',');
    const obj = {};
    const number = Number(sortBy[0]);

    sortBy.forEach((field) => {
      obj[field] = number;
    });

    delete obj[sortBy[0]];

    query = query.sort(obj);
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  query = await query;

  // Set Pagination count 
  const totalPage = query.length > 0? Math.ceil(totalRecords / limit):0;
  const pagination = {
    data: query,
    currentPage: query.length > 0? page: 0,
    totoalPage: totalPage,
    totalDocs: query.length > 0?totalRecords:0
  }

  return pagination;

  // return query;
});

export const productListing = catchAsync(async (req, model, populate) => {
  let query;

  const {isFeatured,category,priceRange,seller,filter} = req.query
  const search = filter;
  const sellerId = seller;
  const categoryId = category;
  const priceRanges = priceRange
  const isFeaturedProduct = isFeatured;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'filter','seller','category','isFeatured'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  queryStr = JSON.parse(queryStr)

  const regex = new RegExp(["", search, ""].join(""), "i");

  if (search)
    queryStr['name'] = {$regex : regex}


  if (sellerId)
    queryStr['seller.id'] = sellerId

  if (categoryId)
    queryStr['category.id'] = categoryId

  if (isFeaturedProduct)
    queryStr['isFeatured'] = isFeaturedProduct

  if (priceRanges){
    const prices = priceRanges.split(',');
    queryStr['price'] = {$gt:prices[0], $lt:prices[1]}
  }
    

  // Finding resource and Document Count
  query = model.find(queryStr);
  const totalRecords = await model.countDocuments(queryStr);


  if (!query) {
    throw new AppError('No Data Found', 400);
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // SortBy
  const sortByKey = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',');
    
    const number = Number(sortBy[0]);

    sortBy.forEach((field) => {
      sortByKey[field] = number;
    });
    delete sortByKey[sortBy[0]];
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.sort(sortByKey).skip(skip).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  query = await query;

  const totalPage = query.length > 0? Math.ceil(totalRecords / limit):0; 

  const pagination = {
      data: query,
      currentPage: query.length > 0? page: 0,
      totoalPage: totalPage,
      totalDocs: query.length > 0?totalRecords:0
  }

  return pagination;
});

export default apiFeatures;
