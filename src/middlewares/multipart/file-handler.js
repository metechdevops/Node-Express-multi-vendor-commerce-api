import multer from "multer";
import path from "path";

const prepareFileFilter = (supportedExtensions) => {
  return (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);

    if (supportedExtensions.includes(fileExtension.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${supportedExtensions} are allowed`), false);
    }
  };
};

export const getFileHandler = (fileSize, supportedExtensions) => {
  return multer({
    fileFilter: prepareFileFilter(supportedExtensions),
    storage: multer.memoryStorage(),
    limits: { fileSize },
  });
};