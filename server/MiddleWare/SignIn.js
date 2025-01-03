const joi = require("joi")

const loginValidation = async (req, res, next) => {
    const loginSchema = joi.object({
      email: joi.string().email().required().messages({
        "string.email": `InvalidEmail`,
        "any.required": `EmailRequired`,
      }),
      password: joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        "string.pattern.base": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": `"password" is a required field`,
      }),

    });
  
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ status: error.details[0].message });
    }
    next();
  };
module.exports =  loginValidation;