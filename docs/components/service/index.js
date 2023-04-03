
import {ImageSchema} from "../common/index"
import {ProductAttributesSchema} from "../common/product.attributes.schema"


const serviceObjectSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      example: '611f6385628e64b6ff96393c'
    },
    mainImage: ImageSchema,
    images: {
        type: 'array',
        items: ImageSchema
    },
    tags: {
        type: 'array',
        items: {
            type: "string",
            example: 'tag1',
            example2: 'tag2',
        }
    },
    price: {
      type: 'integer',
      example: 3100
    },
    attributes: {
      type: 'array',
      items: ProductAttributesSchema
    },
    ratingsAverage: {
      type: 'integer',
      example: 4.5
    },
    description: {
      type: 'string',
      example:
        '1- Brand: Lenovo\n2- Dimensions: 319.5 x 216.7 x 15.3-16.5 mm\n3- Weight: 1.44 kg \n4- Operating system: Windows10 Home\n5- Hard Disk Capacity: 1 TB \n6- Hard Disk Interface: SSD\n7- Memory capacity: 16GB\n8- 11th Generation Intel Core i7 Processor\n9- Processor Number:  i7-1185G7 \n10- Number of Cores: 4\n11- Max Turbo Frequency: 4.8GHz\n12- 14 inches UHD (3840x2160) IPS 500nits\n13- Touchscreen:10-point Multi-touch\n14- Camera: 720P\n15- Graphic Card: Integrated Intel Iris Xe Graphics\n'
    },
    name: {
      type: 'string',
      example:
        'Fixing Main Gate Issue'
    },
    slug: {
      type: 'string',
      example:
        'lenovo-yoga-9-14itl5-laptop'
    },
    category: {
      type: 'object',
      properties : {
        id : {
          type: 'string',
          example:"611d08a62fc210a30ecfb75b"
        },
        name : {
          type: 'string',
          example:"Test Category"
        }
      }
    },
    subCategory: {
      type: 'object',
      properties : {
        id : {
          type: 'string',
          example:"611d08a62fc210a30ecfb75b"
        },
        name : {
          type: 'string',
          example:"Test Category"
        }
      }
    },
    isFeatured: {
      type: 'boolean',
      example: false
    },
    durationType: {
        type: 'string',
        example:"hourly"
    },
    seller: {
      type: 'object',
      properties : {
        id : {
          type: 'string',
          example:"611d08a62fc210a30ecfb75b"
        },
        name : {
          type: 'string',
          example:"Seller Service ABC"
        }
      }
    },
    createdAt: {
      type: 'string',
      example: '2021-08-20T08:10:45.242Z'
    },
    updatedAt: {
      type: 'string',
      example: '2021-08-20T08:10:45.242Z'
    }
  }
}


const addServiceRequestBody = {
    description: 'Add new service request body.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: [
            "name",
            "description",
            "category",
            "durationType",
            "price",
          ],
          properties: {
            serviceId : {
              type: 'string',
              example:"611d08a62fc210a30ecfb75b"
            },
            name: {
              type: 'string',
              maxLength: 120,
              example:"Test service"
            },
            description: {
              type: 'string',
              maxLength: 500,
              example:"This is test service description"
            },
            shortDescription: {
                type: 'string',
                maxLength: 250,
                example:"This is test service short description"
              },
            category: {
              type: 'string',
              example:"611d08a62fc210a30ecfb75b"
            },
            subCategory: {
              type: 'string',
              example:"611d08a62fc210a30ecfb75b"
            },
            durationType: {
                type: 'string',
                example:"hourly"
            },
            price: {
              type: 'integer',
              example: 200
            },
            isFeatured: {
              type: 'boolean',
              example: false
            },
            mainImage: ImageSchema,
            images: {
              type: 'array',
              items: ImageSchema
            },
            attributes: {
              type: 'array',
              items: ProductAttributesSchema
            },
            tags: {
                type: 'array',
                items: {
                    type: "string",
                    example:"tag1, tag2, tag3"
                }
            }
          }
        }
      }
    }
}

const updateServiceBody = {
  description: 'Update service request body.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: [
          "name",
          "description",
          "category",
          "durationType",
          "price",
        ],
        properties: {
          name: {
            type: 'string',
            maxLength: 120,
            example:"Test service"
          },
          description: {
            type: 'string',
            maxLength: 500,
            example:"This is test service description"
          },
          shortDescription: {
              type: 'string',
              maxLength: 250,
              example:"This is test service short description"
            },
          category: {
            type: 'string',
            example:"611d08a62fc210a30ecfb75b"
          },
          subCategory: {
            type: 'string',
            example:"611d08a62fc210a30ecfb75b"
          },
          durationType: {
              type: 'string',
              example:"hourly"
          },
          price: {
            type: 'integer',
            example: 200
          },
          isFeatured: {
            type: 'boolean',
            example: false
          },
          mainImage: ImageSchema,
          images: {
            type: 'array',
            items: ImageSchema
          },
          attributes: {
            type: 'array',
            items: ProductAttributesSchema
          },
          tags: {
              type: 'array',
              items: {
                  type: "string",
                  example:"tag1, tag2, tag3"
              }
          }
        }
      }
    }
  }
}

const addService201 = {
    description: 'Add New Service 201 response',
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
              example: 'Service Created Successfully.'
            },
            service: serviceObjectSchema
          }
        }
      }
    }
  }



const addService400 = {
    description: 'Error: 400',
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
              example: 'All fields are required.'
            }
          }
        }
      }
    }
}


module.exports = {
  addServiceRequestBody,
  updateServiceBody,
  serviceObjectSchema,
  addService201,
  addService400
}