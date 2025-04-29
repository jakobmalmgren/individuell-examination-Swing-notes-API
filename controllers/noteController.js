import { v4 as uuidv4 } from "uuid";
import {
  insertNotesInDb,
  findNotesInDb,
  deleteNoteInDb,
  updateNoteInDb,
} from "../models/notesModel.js";

export const addNote = async (req, res) => {
  const userId = req.userId;
  const { title, text } = req.body;
  const noteObj = {
    itemId: uuidv4(),
    title: title,
    text: text,
    createdAt: new Date(),
    modifiedAt: new Date(),
    userId: userId,
  };
  if (!userId) {
    return res.status(400).json({ message: "Användar-ID saknas i förfrågan" });
  }
  try {
    await insertNotesInDb(noteObj);
    res
      .status(201)
      .json({ message: "du har skapat en ny note", note: noteObj });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "kunde inte skapa note", error: err.message });
  }
};

export const getNotes = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "Användar-ID saknas i förfrågan" });
  }
  try {
    const allNotes = await findNotesInDb(userId);
    res
      .status(200)
      .json({ message: "dina notes hämtades utan problem!", notes: allNotes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "kunde inte hämta notes", error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ message: "item ID saknas i bodyn" });
  }
  try {
    const deletedNoteCount = await deleteNoteInDb(itemId);
    if (deletedNoteCount === 0) {
      return res.status(404).json({ message: "ID:t existerar inte" });
    }

    return res
      .status(200)
      .json({ message: `noten med itemId:${itemId} raderat` });
  } catch (err) {
    res.status(500).json({ message: "kunde inte deleta note" });
  }
};

export const updateNote = async (req, res) => {};
