import jwt from "jsonwebtoken";

// KOLLAR OM MAN ÄR AUTHORISERAD
export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "ingen authorization i header inkluderat!" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.MY_SECRET_KEY);
    console.log("PAYLOAD-", payload.id);
    req.userId = payload.id;
    // res.status(200).json({ message: "du är inloggad", payload: payload });

    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "JWT-token är ogiltig eller utgången.", error: err });
  }
};
