import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  itemId: Joi.string().required(),
});

export const deleteNoteSchema = Joi.object({
  //   itemId: Joi.string().required(),
  itemId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid":
        "ItemId måste vara ett giltigt UUID i version 4, exempel på hur det ska skrivas: 266d0295-c1d2-4802-89b2-00c25efbc1e6",
      "string.empty": "ItemId kan inte vara tomt", // Om itemId är tomt
      "any.required": "ItemId är ett obligatoriskt fält", // Om itemId inte skickas alls
    }),
});

export const findNoteSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Du måste skicka med en title i query-parametern!",
    "string.empty": "Title får inte vara tom",
  }),
});
