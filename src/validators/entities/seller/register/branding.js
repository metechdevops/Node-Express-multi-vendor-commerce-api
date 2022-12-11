export const Branding = {
    logo: {
      type:"object",
      properties:{
        original: {
          type: 'string',
          format: 'url'
        },
        web: {
          type: 'string',
          format: 'url'
        },
        mobile: {
          type: 'string',
          format: 'url'
        }
      },
    },
    bannerImage: {
      type:"object",
      properties:{
        original: {
          type: 'string',
          format: 'url'
        },
        web: {
          type: 'string',
          format: 'url'
        },
        mobile: {
          type: 'string',
          format: 'url'
        }
      }
    },
}