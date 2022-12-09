import addFormats from  "ajv-formats";
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}

require("ajv-errors")(ajv);
 
addFormats(ajv);

const validate = (data, validationSchema) => {
  const validation = ajv.compile(validationSchema);

  if (!validation(data)) return validation.errors;
};

module.exports = {
  validate,
};
