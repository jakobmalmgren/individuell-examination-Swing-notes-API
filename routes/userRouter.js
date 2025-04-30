import express from "express";
import { signUp, logIn } from "../controllers/userController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { signUpSchema, logInSchema } from "../validators/userValidators.js";

const router = express.Router();

router.post("/signup", validateBody(signUpSchema), signUp);

router.post("/login", validateBody(logInSchema), logIn);

export default router;
