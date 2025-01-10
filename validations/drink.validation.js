const Joi = require("joi");
const { objectIdValidator } = require("./common.validation");

const createDrinkSchema = Joi.object({
    name: Joi.string().required().min(1).max(100).disallow(null).messages({
        "string.base": "Drink name must be a string",
        "string.min": "Drink name must be at least 1 characters long",
        "string.max": "Drink name must be less than or equal to 100 characters",
        "any.required": "Please provide drink name",
        "any.invalid": "Drink name cannot be null",
    }),

    price: Joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be greater than or equal to 0",
        "any.required": "Please provide price",
    }),

    category: Joi.string().required().disallow(null).messages({
        "string.base": "Category must be a string",
        "any.required": "Please provide category",
        "any.invalid": "Category cannot be null",
    }),
    description: Joi.string().allow(null).messages({
        "string.base": "Description must be a string",
    }),
    shortDescription: Joi.string().max(100).allow(null).messages({
        "string.base": "Short description must be a string",
        "string.max": "Short description must be less than or equal to 100 characters",
    }),
    slug: Joi.string().required().min(1).max(100).disallow(null).messages({
        "string.base": "Slug must be a string",
        "string.min": "Slug must be at least 1 characters long",
        "string.max": "Slug must be less than or equal to 100 characters",
        "any.required": "Please provide drink slug",
        "any.invalid": "Slug cannot be null",
    }),
    thumbnail: Joi.string().required().disallow(null).messages({
        "string.base": "Thumbnail must be a string",
        "any.required": "Please provide drink thumbnail",
        "any.invalid": "Thumbnail cannot be null",
    }),
    images: Joi.array().items(Joi.object({
        url: Joi.string().required().disallow(null).messages({
            "string.base": "Image url must be a string",
            "any.required": "Please provide image url",
            "any.invalid": "Image url cannot be null",
        }),
        alt: Joi.string().allow(null).messages({
            "string.base": "Image alt must be a string",
        }),
        order: Joi.number().required().messages({
            "number.base": "Image order must be a number",
            "any.required": "Please provide image order",
        }),
    })).required().messages({
        "array.base": "Images must be an array",
        "any.required": "Please provide images",
    }),
    ingredients: Joi.array().items(Joi.object({
        name: Joi.string().required().disallow(null).messages({
            "string.base": "Ingredient name must be a string",
            "any.required": "Please provide ingredient name",
            "any.invalid": "Ingredient name cannot be null",
        }),
        quantity: Joi.string().required().disallow(null).messages({
            "string.base": "Ingredient quantity must be a string",
            "any.required": "Please provide ingredient quantity",
            "any.invalid": "Ingredient quantity cannot be null",
        }),
        unit: Joi.string().required().disallow(null).messages({
            "string.base": "Ingredient unit must be a string",
            "any.required": "Please provide ingredient unit",
            "any.invalid": "Ingredient unit cannot be null",
        }),
    })).required().messages({
        "array.base": "Ingredients must be an array",
        "any.required": "Please provide ingredients",
    }),
    recipe: Joi.string().allow(null).messages({
        "string.base": "Recipe must be a string",
    }),
    tags: Joi.array().items(Joi.string().required().disallow(null)).required().messages({
        "array.base": "Tags must be an array",
        "any.required": "Please provide tags",
    }),
});

module.exports = { createDrinkSchema };