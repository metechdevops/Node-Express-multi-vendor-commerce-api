const imageSchema  = {
  type: 'object',
  properties: {
    original: {
      type: ["string","null"],
      format: "uri",
      errorMessage : "Original image URL is invalid"
    },
    web: {
      type: ["string","null"],
      format: "uri",
      errorMessage : "Web image URL is invalid"
    },
    mobile: {
      type: ["string","null"],
      format: "uri",
      errorMessage : "Mobile image URL is invalid"
    }
  }
}

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
      type:"array",
      items: imageSchema
    },
}