import Joi from "joi";

export const logInSchema = Joi.object({
  username: Joi.required(),
  password: Joi.required(),
});

export const signUpSchema = Joi.object({
  username: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .custom((value, helpers) => {
      if (value.toString().length < 3) {
        return helpers.message("username måste vara minst 3 tecken");
      }
      return value;
    })
    .required(),
  password: Joi.alternatives()
    .try(Joi.string(), Joi.number()) // Tillåter både strängar och siffror
    .custom((value, helpers) => {
      if (value.toString().length < 5) {
        return helpers.message("password måste vara minst 5 tecken");
      }
      return value;
    })
    .required(),
});
