module.exports = {
  
  SUPPORTED_IMAGES: [".jpg", ".png", ".jpeg", ".PNG", ".JPG", ".JPEG",".webp",".WEBP"],
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
    ".jpg", 
    ".png", 
    ".jpeg", 
    ".PNG", 
    ".JPG", 
    ".JPEG",
    ".webp",
    ".WEBP"
  ],
  USER_ROLE: {
    ADMIN:"admin",
    USER:"user",
    SELLER:"seller",
    DRIVER:"driver"
  },
  ORDER_STATUS: {
    PENDING:"pending",
    PROCESSING:"processing",
    SHIPPED:"shipped",
    DELIVERED:"delivered",
    CANCELED:"cancelled",
  },
  ORDER_STATUS_ENUM : [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ],
  DURATION_TYPE: {
    HOUR:"hourly",
    DAY:"daily",
    MONTH:"monthly",
    WEEK:"weekly",
    ONE_TIME:"oneTime",
  },
  DURATION_TYPE_ENUM : [
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'oneTime'
  ],
  S3_TEMPLATE_PATH : "https://e-cart-dev.s3.eu-west-1.amazonaws.com/email-templates/"
};
