//NOTE ROUTER

import express from "express";
const router = express.Router();
import {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
} from "../controllers/noteController.js";

//HÄMTAR POSTS
router.get("/", getNotes);

//SKAPAR POSTS
router.post("/", addNote);

//UPPDATERAR POSTS
router.put("/", updateNote);

//DELETAR POSTS
router.delete("/", deleteNote);

//SÖKER EFTER POSTS
// router.get("/search", () => {});

export default router;
