const Joi = require("joi");

const createCitySchema = Joi.object({
  name: Joi.string().required().min(1).max(100).disallow(null).messages({
    "string.base": "City name must be a string",
    "string.min": "City name must be at least 1 characters long",
    "string.max": "City name must be less than or equal to 100 characters",
    "any.required": "Please provide city name",
    "any.invalid": "City name cannot be null",
  }),
});

const createCitiesSchema = Joi.array().items(Joi.object({
  name: Joi.string().required().min(1).max(100).disallow(null).messages({
    "string.base": "City name must be a string",
    "string.min": "City name must be at least 1 characters long",
    "string.max": "City name must be less than or equal to 100 characters",
    "any.required": "Please provide city name",
    "any.invalid": "City name cannot be null",
  }),
}));

// Schema to update all fields except 'deleted'
const updateCityOtherFieldsSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional().disallow(null).messages({
    "string.base": "City name must be a string",
    "string.min": "City name must be at least 1 characters long",
    "string.max": "City name must be less than or equal to 100 characters",
    "any.invalid": "City name cannot be null",
  }),

  totalAreas: Joi.number().min(0).optional().disallow(null).messages({
    "number.base": "Total areas must be a number",
    "number.min": "Total areas must be greater than or equal to 0",
    "number.invalid": "totalAreas cannot be null",
  }),

  totalStores: Joi.number().min(0).optional().disallow(null).messages({
    "number.base": "Total stores must be a number",
    "number.min": "Total stores must be greater than or equal to 0",
    "number.invalid": "totalStores cannot be null",
  }),
});

const updateCityDeletedFieldSchema = Joi.object({
  deleted: Joi.boolean().required().valid(true, false).messages({
    "boolean.base": "Deleted must be a boolean",
    "any.required": "Please provide deleted",
  }),
});

module.exports = {
  createCitySchema,
  updateCityOtherFieldsSchema,
  updateCityDeletedFieldSchema,
  createCitiesSchema,
};
