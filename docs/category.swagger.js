import { ImageSchema } from './components/common';

const {
  CategoryRequestBody,
  CategoryResponse201,
  CategoryResponse400,
  CategoryResponse404
} = require ('./components/category')

export const getAllCategories = {
  tags: ['Category'],
  description: 'This route allow to get all categories',
  opeationId: 'getAllCategories',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'query',
      name: 'select',
      type: 'string',
      example: 'name, description',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of categories from for example 20 category to 5 categories.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting categories according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '1',
      description:
        'When number of categories is greater than 10 categories, it divides into pages each page contain 10 categories.'
    }
  ],
  responses: {
    200: {
      description: 'Get All Categories',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Success'
              },
              message: {
                type: 'string',
                example: 'Found Categories Successfully.'
              },
              catagories: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '611ed9117ae59e944d27920d'
                    },
                    name: {
                      type: 'string',
                      example: 'Makeup'
                    },
                    description: {
                      type: 'string',
                      example:
                        'This category contains all products related to makeup.'
                    },
                    contentType: {
                      type: 'string',
                      example: 'product'
                    },
                    isFeatured: {
                      type: 'boolean',
                      example: false
                    },
                    image: ImageSchema,
                    createdAt: {
                      type: 'string',
                      example: '2021-08-19T22:20:01.688Z'
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2021-08-19T22:20:01.688Z'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    404: {
      description: 'Error: 404',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Error'
              },
              message: {
                type: 'string',
                example: 'No Categories Found'
              }
            }
          }
        }
      }
    }
  }
};

export const getCategory = {
  tags: ['Category'],
  description: "This route allow to get category using it's ID",
  opeationId: 'getCategory',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'categoryId',
      type: 'integer',
      description: 'Category ID'
    }
  ],
  responses: {
    200: CategoryResponse201,
    404: CategoryResponse400
  }
};

export const addCategory = {
  tags: ['Category'],
  description: 'This route allow only admin to add new category',
  opeationId: 'addCategory',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: CategoryRequestBody,
  responses: {
    201: CategoryResponse201,
    400: CategoryResponse400
  }
};

export const updateCategoryDetails = {
  tags: ['Category'],
  description:
    'This route allow only admin to update category details [name / description]',
  opeationId: 'updateCategoryDetails',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'categoryId',
      type: 'integer',
      description: 'Category ID'
    }
  ],
  requestBody: CategoryRequestBody,
  responses: {
    200: CategoryResponse201,
    404: CategoryResponse404
  }
};


export const deleteCategory = {
  tags: ['Category'],
  description: 'This route allow only admin to delete the category',
  opeationId: 'deleteCategory',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'categoryId',
      type: 'integer',
      description: 'Category ID'
    }
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Delete category',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Success'
              },
              message: {
                type: 'string',
                example: 'Category Deleted Successfully.'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'Error: 404',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Error'
              },
              message: {
                type: 'string',
                example: 'No Category Found With This ID: {id}'
              }
            }
          }
        }
      }
    }
  }
};
