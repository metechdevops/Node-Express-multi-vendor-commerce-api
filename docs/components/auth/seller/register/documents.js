export const documentSchema = {  
  type:"object",
  properties:{
    link: {
      type: 'string',
      format: 'url',
      example:"https://www.africau.edu/images/default/sample.pdf"
    },
    s3Id: {
      type: 'string',
      example:"4b41a3475132bd861b30a878e30aa56a"
    },
  }   
}