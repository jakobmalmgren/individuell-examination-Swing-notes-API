import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string(),
  text: Joi.string(),
  itemId: Joi.string().required(),
}).or("title", "text"); // en av de två måste minst finnnas med, id alltid!

export const deleteNoteSchema = Joi.object({
  itemId: Joi.string().required(),
});

export const findNoteSchema = Joi.object({
  title: Joi.string().required(),
});
