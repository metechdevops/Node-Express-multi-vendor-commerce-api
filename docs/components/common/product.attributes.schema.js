export const ProductAttributesSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example:"Feature Name"
    },
    detail: {
      type: 'string',
      example:"Feature Detail"
    }
  }
}