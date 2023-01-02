module.exports = {
  
  SUPPORTED_IMAGES: [".jpg", ".png", ".jpeg", ".PNG", ".JPG", ".JPEG"],
  SUPPORTED_DOCUMENTS: [
    ".pdf",
    ".txt",
    ".doc",
    ".docx",
    ".csv",
    ".PDF",
    ".TXT",
    ".DOC",
    ".DOCX",
    ".CSV",
  ],
  USER_ROLE: {
    ADMIN:"admin",
    USER:"user",
    SELLER:"seller",
  },
  S3_TEMPLATE_PATH : "https://e-cart-dev.s3.eu-west-1.amazonaws.com/email-templates/"
};
