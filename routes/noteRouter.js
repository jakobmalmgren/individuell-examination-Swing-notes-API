//NOTE ROUTER
import { validateBody } from "../middlewares/validateBody.js";
import { validateQuery } from "../middlewares/validateQuery.js";
import { validateParams } from "../middlewares/validateParams.js";
import {
  createNoteSchema,
  updateNoteSchema,
  deleteNoteSchema,
  findNoteSchema,
} from "../validators/noteValidators.js";
import express from "express";
import {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
  findNote,
} from "../controllers/noteController.js";

const router = express.Router();

//HÄMTAR POSTS
router.get("/", getNotes);

//SKAPAR POSTS
router.post("/", validateBody(createNoteSchema), addNote);

//UPPDATERAR POSTS
router.put("/", validateBody(updateNoteSchema), updateNote);

//DELETAR POSTS
router.delete("/:itemId", validateParams(deleteNoteSchema), deleteNote);

//SÖKER EFTER POSTS
router.get("/search", validateQuery(findNoteSchema), findNote);

//SWAGGERS FÖR NOTEROUTES

/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Hämta alla anteckningar
 *     security:
 *       - bearerAuth: []
 *     description: Hämtar alla anteckningar som finns i databasen för den inloggade användaren.
 *     responses:
 *       200:
 *         description: Lista med anteckningar hämtades framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dina anteckningar hämtades utan problem!"
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: string
 *                         example: "aa7dcb16-3006-4106-81ff-3fb0ae62255c"
 *                       title:
 *                         type: string
 *                         example: "Mötesanteckning"
 *                       text:
 *                         type: string
 *                         example: "Detta är texten för mötesanteckningen."
 *                       createdAt:
 *                         type: string
 *                         example: "2025-04-30 17:47:33"
 *                       modifiedAt:
 *                         type: string
 *                         example: "2025-04-30 17:47:33"
 *                       userId:
 *                         type: string
 *                         example: "4e073a68-b808-4855-abd7-565d7ffeaa5c"
 *                       _id:
 *                         type: string
 *                         example: "BAexVIdhm1GLcASp"
 *       401:
 *         description: Ingen eller ogiltig token – du är inte behörig
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ingen authorization i header inkluderat!"
 *       500:
 *         description: Serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kunde inte hämta anteckningar"
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Lägg till anteckning
 *     security:
 *       - bearerAuth: []
 *     description: Lägg till en anteckning i databasen för den inloggade användaren.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mötesanteckning"
 *               text:
 *                 type: string
 *                 example: "Detta är texten för mötesanteckningen."
 *     responses:
 *       201:
 *         description: Anteckningen lades till framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Du har skapat en ny anteckning."
 *                 note:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                       example: "aa7dcb16-3006-4106-81ff-3fb0ae62255c"
 *                     title:
 *                       type: string
 *                       example: "Mötesanteckning"
 *                     text:
 *                       type: string
 *                       example: "Detta är texten för mötesanteckningen."
 *                     createdAt:
 *                       type: string
 *                       example: "2025-04-30 17:47:33"
 *                     modifiedAt:
 *                       type: string
 *                       example: "2025-04-30 17:47:33"
 *                     userId:
 *                       type: string
 *                       example: "4e073a68-b808-4855-abd7-565d7ffeaa5c"
 *                     _id:
 *                       type: string
 *                       example: "BAexVIdhm1GLcASp"
 *       401:
 *         description: Ingen eller ogiltig token – du är inte behörig
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ingen authorization i header inkluderat!"
 *       500:
 *         description: Serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kunde inte skapa anteckning"
 */

/**
 * @swagger
 * /api/notes:
 *   put:
 *     tags:
 *       - Notes
 *     summary: Uppdaterar en anteckning
 *     security:
 *       - bearerAuth: []
 *     description: Uppdaterar en anteckning i databasen för den inloggade användaren.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: "a20ef43b-6cbd-45b0-b6fb-8a3183eb793a"
 *               title:
 *                 type: string
 *                 example: "Mötesanteckning"
 *               text:
 *                 type: string
 *                 example: "Detta är texten för mötesanteckningen."
 *     responses:
 *       200:
 *         description: Anteckningen uppdaterades framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Anteckningen uppdaterades korrekt!"
 *                 newUpdatedVersion:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                       example: "a20ef43b-6cbd-45b0-b6fb-8a3183eb793a"
 *                     title:
 *                       type: string
 *                       example: "Mötesanteckning"
 *                     text:
 *                       type: string
 *                       example: "Detta är texten för mötesanteckningen."
 *                     createdAt:
 *                       type: string
 *                       example: "2025-04-30 17:47:33"
 *                     modifiedAt:
 *                       type: string
 *                       example: "2025-04-30 17:47:33"
 *                     userId:
 *                       type: string
 *                       example: "4e073a68-b808-4855-abd7-565d7ffeaa5c"
 *                     _id:
 *                       type: string
 *                       example: "BAexVIdhm1GLcASp"
 *       401:
 *         description: Ingen eller ogiltig token – du är inte behörig
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ingen authorization i header inkluderat!"
 *       500:
 *         description: Serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kunde inte uppdatera anteckningen"
 */

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Sök efter en anteckning baserat på title
 *     security:
 *       - bearerAuth: []
 *     description: Söker efter en anteckning i databasen baserat på `title` som skickas som query-param.
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *           example: "tvätta"
 *         description: Titeln på anteckningen som ska sökas efter.
 *     responses:
 *       200:
 *         description: Sökningen lyckades (även om inga träffar hittades)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "note/s hittades!"
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       text:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       modifiedAt:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       _id:
 *                         type: string
 *       400:
 *         description: Du måste skicka in rätt data i query-parametern.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "valideringsfel"
 *                 error:
 *                   type: string
 *                   example: "Du måste skicka med en title i query-parametern!"
 *       500:
 *         description: Tekniskt fel – kan bero på databas eller intern validering.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "kunde inte hitta noten"
 */

/**
 * @swagger
 * paths:
 *   /api/notes/{itemId}:
 *     delete:
 *       tags:
 *         - Notes
 *       summary: "Radera en anteckning baserat på itemId"
 *       security:
 *         - bearerAuth: []
 *       description: "Raderar en anteckning från databasen baserat på det angivna itemId. För att lyckas, måste itemId vara ett giltigt UUID i version 4."
 *       parameters:
 *         - in: path
 *           name: itemId
 *           required: true
 *           schema:
 *             type: string
 *             example: "a20ef43b-6cbd-45b0-b6fb-8a3183eb793a"
 *           description: "Det unika ID:t för anteckningen som ska raderas. UUID i version 4, t.ex. '266d0295-c1d2-4802-89b2-00c25efbc1e6'."
 *       responses:
 *         200:
 *           description: "Anteckningen raderades framgångsrikt."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Anteckningen med itemId 'a20ef43b-6cbd-45b0-b6fb-8a3183eb793a' raderades."
 *         400:
 *           description: "Felaktig begäran, t.ex. om `itemId` inte är korrekt eller inte är ett giltigt UUID."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Valideringsfel"
 *                   error:
 *                     type: string
 *                     example: "ItemId måste vara ett giltigt UUID i version 4. Exempel: 266d0295-c1d2-4802-89b2-00c25efbc1e6"
 *         404:
 *           description: "Anteckningen som ska raderas hittades inte."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "ID:t existerar inte i databasen."
 *         500:
 *           description: "Serverfel eller att något gick fel vid validering."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Kunde inte radera anteckningen. Ett serverfel inträffade."
 */

export default router;
