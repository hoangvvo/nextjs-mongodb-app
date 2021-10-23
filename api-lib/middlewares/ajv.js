import Ajv from 'ajv';

export function validateBody(schema) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (valid) {
      return next();
    } else {
      const error = validate.errors[0];
      return res
        .status(400)
        .end(`"${error.instancePath.substring(1)}" ${error.message}`);
    }
  };
}
