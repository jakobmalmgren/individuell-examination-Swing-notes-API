//NOTE ROUTER
import { validateBody } from "../middlewares/validateBody.js";
import { validateQuery } from "../middlewares/validateQuery.js";
import {
  createNoteSchema,
  updateNoteSchema,
  deleteNoteSchema,
  findNoteSchema,
} from "../validators/noteValidators.js";
import express from "express";
const router = express.Router();
import {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
  findNote,
} from "../controllers/noteController.js";

//HÄMTAR POSTS
router.get("/", getNotes);

//SKAPAR POSTS
router.post("/", validateBody(createNoteSchema), addNote);

//UPPDATERAR POSTS
router.put("/", validateBody(updateNoteSchema), updateNote);

//DELETAR POSTS
router.delete("/", validateBody(deleteNoteSchema), deleteNote);

//SÖKER EFTER POSTS
router.get("/search", validateQuery(findNoteSchema), findNote);

export default router;
