
import {ImageSchema} from "././../common/index"
import {ProductAttributesSchema} from "././../common/product.attributes.schema"

const addProductRequestBody = {
    description: 'Add new product request body.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: [
            "name",
            "description",
            "category",
            "unitType",
            "unitValue",
            "price",
            "quantity",
            "stores",
            "sizes",
            "tags",
            "colors",
            "priceDiscount"
          ],
          properties: {
            name: {
              type: 'string',
              example:"Test product"
            },
            description: {
              type: 'string',
              example:"This is test product description"
            },
            shortDescription: {
                type: 'string',
                example:"This is test product short description"
              },
            category: {
              type: 'string',
              example:"Category 1"
            },
            unitType: {
                type: 'string',
                example:"cm"
            },
            unitValue: {
                type: 'string',
                example:"10"
            },
            price: {
              type: 'integer',
              example: 200
            },
            priceDiscount: {
              type: 'integer',
              example: 10
            },
            colors: {
              type: 'string',
              example: 'Red, Green, Blue'
            },
            sizes: {
              type: 'string',
              example: 'S, M, L'
            },
            quantity: {
              type: 'integer',
              example: 20
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
            },
            stores: {
                type: 'array',
                items: {
                    type: "string",
                    example: "611f6385628e64b6ff96393c"
                }
            }
          }
        }
      }
    }
}

const addProduct201 = {
    description: 'Add New Product 201 response',
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
              example: 'Product Created Successfully.'
            },
            product: {
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
                stores: {
                    type: 'array',
                    items: {
                        type: "string",
                        example: '611f6385628e64b6ff96393c',
                        example2: '611f6385628e64b6ff96393c'
                    }
                },
                price: {
                  type: 'integer',
                  example: 3100
                },
                quantity: {
                  type: 'integer',
                  example: 49
                },
                attributes: {
                  type: 'array',
                  items: ProductAttributesSchema
                },
                ratingsAverage: {
                  type: 'integer',
                  example: 4.5
                },
                ratingsQuantity: {
                  type: 'integer',
                  example: 0
                },
                description: {
                  type: 'string',
                  example:
                    '1- Brand: Lenovo\n2- Dimensions: 319.5 x 216.7 x 15.3-16.5 mm\n3- Weight: 1.44 kg \n4- Operating system: Windows10 Home\n5- Hard Disk Capacity: 1 TB \n6- Hard Disk Interface: SSD\n7- Memory capacity: 16GB\n8- 11th Generation Intel Core i7 Processor\n9- Processor Number:  i7-1185G7 \n10- Number of Cores: 4\n11- Max Turbo Frequency: 4.8GHz\n12- 14 inches UHD (3840x2160) IPS 500nits\n13- Touchscreen:10-point Multi-touch\n14- Camera: 720P\n15- Graphic Card: Integrated Intel Iris Xe Graphics\n'
                },
                name: {
                  type: 'string',
                  example:
                    'Lenovo Yoga 9 14ITL5 Laptop - Intel Core i7-1185G7, 14 Inch UHD, 1TB SSD, 16 GB RAM, Integrated Intel Iris Xe Graphics, Windows - Shadow Black'
                },
                category: {
                  type: 'string',
                  example: '611ed87e7ae59e944d27920a'
                },
                priceDiscount: {
                  type: 'integer',
                  example: 15
                },
                unitType: {
                    type: 'string',
                    required: false,
                    example:"cm"
                },
                unitValue: {
                    type: 'string',
                    required: false,
                    example:"10"
                },
                priceAfterDiscount: {
                  type: 'integer',
                  example: 2635
                },
                colors: {
                  type: 'array',
                  items: {
                    type: 'string',
                    example: '6145a457d495858ff0d6e8a2'
                  }
                },
                sizes: {
                  type: 'array',
                  items: {
                    type: 'string',
                    example: '6145a458d495858ff0d6e8a5'
                  }
                },
                seller: {
                  type: 'string',
                  example: '611f62e28fa5d0a76cefbc96'
                },
                createdAt: {
                  type: 'string',
                  example: '2021-08-20T08:10:45.242Z'
                },
                updatedAt: {
                  type: 'string',
                  example: '2021-08-20T08:10:45.242Z'
                },
                slug: {
                  type: 'string',
                  example:
                    'lenovo-yoga-9-14itl5-laptop-intel-core-i7-1185g7-14-inch-uhd-1tb-ssd-16-gb-ram-integrated-intel-iris-xe-graphics-windows-shadow-black'
                }
              }
            }
          }
        }
      }
    }
  }

const productObjectSchema = {
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
        stores: {
            type: 'array',
            items: {
                type: "string",
                example: '611f6385628e64b6ff96393c',
                example2: '611f6385628e64b6ff96393c'
            }
        },
        price: {
        type: 'integer',
        example: 3100
        },
        quantity: {
        type: 'integer',
        example: 49
        },
        sold: {
        type: 'integer',
        example: 10
        },
        isOutOfStock: {
        type: 'boolean',
        example: false
        },
        ratingsAverage: {
        type: 'integer',
        example: 4.5
        },
        ratingsQuantity: {
        type: 'integer',
        example: 0
        },
        description: {
        type: 'string',
        example:
            '1- Brand: Lenovo\n2- Dimensions: 319.5 x 216.7 x 15.3-16.5 mm\n3- Weight: 1.44 kg \n4- Operating system: Windows10 Home\n5- Hard Disk Capacity: 1 TB \n6- Hard Disk Interface: SSD\n7- Memory capacity: 16GB\n8- 11th Generation Intel Core i7 Processor\n9- Processor Number:  i7-1185G7 \n10- Number of Cores: 4\n11- Max Turbo Frequency: 4.8GHz\n12- 14 inches UHD (3840x2160) IPS 500nits\n13- Touchscreen:10-point Multi-touch\n14- Camera: 720P\n15- Graphic Card: Integrated Intel Iris Xe Graphics\n'
        },
        name: {
        type: 'string',
        example:
            'Lenovo Yoga 9 14ITL5 Laptop - Intel Core i7-1185G7, 14 Inch UHD, 1TB SSD, 16 GB RAM, Integrated Intel Iris Xe Graphics, Windows - Shadow Black'
        },
        category: {
        type: 'string',
        example: '611ed87e7ae59e944d27920a'
        },
        priceDiscount: {
        type: 'integer',
        example: 15
        },
        unitType: {
            type: 'string',
            required: false,
            example:"cm"
        },
        unitValue: {
            type: 'string',
            required: false,
            example:"10"
        },
        attributes: {
          type: 'array',
          items: ProductAttributesSchema
        },
        priceAfterDiscount: {
        type: 'integer',
        example: 2635
        },
        colors: {
        type: 'array',
        items: {
            type: 'string',
            example: '6145a457d495858ff0d6e8a2'
        }
        },
        sizes: {
        type: 'array',
        items: {
            type: 'string',
            example: '6145a458d495858ff0d6e8a5'
        }
        },
        seller: {
        type: 'string',
        example: '611f62e28fa5d0a76cefbc96'
        },
        createdAt: {
        type: 'string',
        example: '2021-08-20T08:10:45.242Z'
        },
        updatedAt: {
        type: 'string',
        example: '2021-08-20T08:10:45.242Z'
        },
        slug: {
        type: 'string',
        example:
            'lenovo-yoga-9-14itl5-laptop-intel-core-i7-1185g7-14-inch-uhd-1tb-ssd-16-gb-ram-integrated-intel-iris-xe-graphics-windows-shadow-black'
        }
    }
    
  }


const addProduct400 = {
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
  addProductRequestBody,
  productObjectSchema,
  addProduct201,
  addProduct400
}