export const ImageSchema = {
  type: 'object',
  properties: {
    original: {
      type: 'string',
      format: 'url',
      example:"https://i.pravatar.cc/300"
    },
    web: {
      type: 'string',
      format: 'url',
      example:"https://i.pravatar.cc/500"
    },
    mobile: {
      type: 'string',
      format: 'url',
      example:"https://i.pravatar.cc/200"
    }
  }
}