import { hashedPassword, comparePassword } from "../bcrypt.js";
import { createUserToDb, findUser } from "../models/usersModel.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    // funktion från userModels.js
    const user = await findUser(username);
    if (user.length > 0) {
      //kod för misslyckat skapande av anv.
      return res.status(409).json({ message: "användarnamn är upptaget" });
    }
    // funktion från bcrypt.js
    const decodedPassword = await hashedPassword(password);
    // funktion från userModels.js
    await createUserToDb(username, decodedPassword);
    res.status(201).json({
      message: "skapande av ny användare lyckades!",
    });
  } catch (err) {
    res.status(500).json({ error: "Något gick fel på servern", error: err });
  }
};

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUser(username);
    console.log("USER", user); // user är en array, därför [0] nedanför (user[0].password)

    if (user.length === 0) {
      return res
        .status(404)
        .json({ message: "fel användarnamn eller lösenord" });
      //Användarnamnet är inte registrerat. Men skriver ett annat felmeddelande
      // för att inte ge användaren som skriver in sina credentials för mycket information
    }
    const checkIfMatch = await comparePassword(password, user[0].password);
    if (checkIfMatch) {
      const token = jwt.sign({ id: user[0].id }, process.env.MY_SECRET_KEY, {
        expiresIn: "6h",
      });
      return res.status(200).json({
        message: "inloggning lyckad!",
        token: token,
      });
    } else {
      res.status(401).json({ message: "fel användarnamn eller lösenord" });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Något gick fel på servern" });
  }
};
