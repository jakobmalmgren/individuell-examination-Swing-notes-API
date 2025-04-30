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
  itemId: Joi.string().required(),
});

export const findNoteSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Du måste skicka med en title i query-parametern!",
    "string.empty": "Title får inte vara tom",
  }),
});
