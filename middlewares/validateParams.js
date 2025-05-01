// VALIDERAR PARAMS OCH HÄR SKICKAS OLIKA JOI SCHEMAN IN
export const validateParams = (schema) => {
  return async (req, res, next) => {
    try {
      const { error, value } = await schema.validate(req.params);
      if (error) {
        return res
          .status(400)
          .json({ message: "valideringsfel", error: error.details[0].message });
      }
      req.params = value; // Tar bort extra inputs
      next();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Något gick fel vid validering", error: err.message });
    }
  };
};
