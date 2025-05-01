// VALIDERAR QUERY OCH HÄR SKICKAS OLIKA JOI SCHEMAN IN
export const validateQuery = (schema) => {
  return async (req, res, next) => {
    try {
      const { error, value } = await schema.validate(req.query);
      if (error) {
        return res
          .status(400)
          .json({ message: "valideringsfel", error: error.details[0].message });
      }
      //   req.query = value; // Tar bort extra inputs
      req.validatedQuery = value;
      next();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Något gick fel vid validering", error: err.message });
    }
  };
};
