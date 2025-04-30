import express from "express";
import { signUp, logIn } from "../controllers/userController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { signUpSchema, logInSchema } from "../validators/userValidators.js";

const router = express.Router();

router.post("/signup", validateBody(signUpSchema), signUp);

router.post("/login", validateBody(logInSchema), logIn);

//SWAGGERS FÖR USEROUTES

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Skapa användare
 *     description: Skapar en användare och lägger den i databasen.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newUser123"
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Användare skapad framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Skapande av ny användare lyckades!"
 *       400:
 *         description: Valideringsfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Valideringsfel"
 *                 error:
 *                   type: string
 *                   example: "\"username\" is required"
 *       409:
 *         description: Användarnamn upptaget
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Användarnamn är upptaget"
 *       500:
 *         description: Serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Något gick fel på servern"
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Loggar in en användare och får en token
 *     description: Loggar in en användare och får en token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newUser123"
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Användare inloggad framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inloggning lyckad!"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6kpXVCJ9.eyZCI6IjczOWIxNzNiLTBmMTgtNDI4NC05NGRkLWQxNTMzMzRhNWNjMSIsImlhdCI6MTc0NjA1MTY2OSwiZXhwIjxNzQ2MDcMjY5fQ.tpw9qiA0DxzqhFMSq3iujS7DQRT8bmR_TrS08yvN-4"
 *       400:
 *         description: Valideringsfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Valideringsfel"
 *                 error:
 *                   type: string
 *                   example: "\"username\" is required"
 *       401:
 *         description: Fel användarnamn eller lösenord
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fel användarnamn eller lösenord"
 *       404:
 *         description: Användarnamnet är inte registrerat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fel användarnamn eller lösenord"
 *       500:
 *         description: Serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Något gick fel på servern"
 */

export default router;
