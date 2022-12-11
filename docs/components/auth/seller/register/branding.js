export const Branding = {
    logo: {
      type:"object",
      properties:{
        original: {
          type: 'string',
          format: 'url',
          example:"https://i.pravatar.cc/800"
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
    },
    bannerImage: {
      type:"object",
      properties:{
        original: {
          type: 'string',
          format: 'url',
          example:"https://i.pravatar.cc/800"
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
    },
}