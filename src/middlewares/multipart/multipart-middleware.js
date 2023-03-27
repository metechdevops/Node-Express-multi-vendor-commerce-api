import multer from "multer";
import { getFileHandler } from "./file-handler";
import { forEach } from "lodash";
const mb = () => 1024 * 1024;
const {
  SUPPORTED_IMAGES,
  SUPPORTED_DOCUMENTS,
} = require("../../constants/constants");

const fileErrorCallback = (resp, next) => {
  return (error) => {
    if (error) {
      handleError(resp, error);
    } else {
      next();
    }
  };
};

const handleSingleFileUpload = (
  name,
  fileSize = 30 * mb(),
  supportedExtensions = SUPPORTED_IMAGES
) => {
  return (req, resp, next) => {
    const fileHandler = getFileHandler(fileSize, supportedExtensions).single(
      name
    );

    fileHandler(req, resp, fileErrorCallback(resp, next));
  };
};

const handleMultipleFilesUpload = (
  name,
  fileSize = 5 * mb(),
  supportedExtensions = SUPPORTED_IMAGES
) => {
  return (req, resp, next) => {
    const fileHandler = getFileHandler(fileSize, supportedExtensions).array(
      name
    );
    fileHandler(req, resp, fileErrorCallback(resp, next));
  };
};

const handleMultiFieldsFilesUpload = (names, fileSize, supportedExtensions) => {
  return (req, resp, next) => {
    const fileHandler = getFileHandler(fileSize, supportedExtensions).fields(
      names
    );
    fileHandler(req, resp, fileErrorCallback(resp, next));
  };
};
const handleError = (resp, error) => {

  if (error instanceof multer.MulterError) {
    resp.status(500).send({
      message:
        "Some error occurred while uploading file(s), please consult your system administrator. File Size Limit is 10MB",
      error: error.message  
    });
  } else {
    resp.status(400).send({
      message: `Could not upload file(s), please verify file being uploaded. ${error.message}`,
      error,
    });
  }
};

module.exports = {
  handleSingleImageUpload: handleSingleFileUpload,
  handleSingleFileUpload: (name) =>
    handleSingleFileUpload(
      name,
      30 * mb(),
      SUPPORTED_IMAGES.concat(SUPPORTED_DOCUMENTS)
    ),
  handleMultipleImagesUpload: handleMultipleFilesUpload,
  handleMultipleDocsUpload : (name) => handleMultipleFilesUpload (name, 30 * mb(), SUPPORTED_DOCUMENTS),
  handleImagesAndDocsUpload: (names) => {
    let namesObjectsArray = [];
    forEach(names, (name) => {
      namesObjectsArray.push({ name: name });
    });

    return handleMultiFieldsFilesUpload(
      namesObjectsArray,
      30 * mb(),
      SUPPORTED_IMAGES.concat(SUPPORTED_DOCUMENTS)
    );
  },
};
