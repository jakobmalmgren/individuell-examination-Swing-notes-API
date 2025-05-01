import { v4 as uuidv4 } from "uuid";
import {
  insertNotesInDb,
  findNotesInDb,
  deleteNoteInDb,
  updateNoteInDb,
  findSpecifikNoteInDb,
  searchNoteByTitleInDb,
} from "../models/notesModel.js";

export const addNote = async (req, res) => {
  const userId = req.userId;
  const { title, text } = req.body;
  const noteObj = {
    itemId: uuidv4(),
    title: title,
    text: text,
    createdAt: new Date().toLocaleString("sv-SE"),
    modifiedAt: new Date().toLocaleString("sv-SE"),
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
    if (allNotes.length === 0) {
      return res.status(200).json({
        message: "du har inga notes för tillfället!",
        notes: allNotes,
      });
    }
    return res
      .status(200)
      .json({ message: "dina notes hämtades utan problem!", notes: allNotes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "kunde inte hämta notes", error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedNoteCount = await deleteNoteInDb(itemId);
    if (deletedNoteCount === 0) {
      return res.status(404).json({ message: "ID:t existerar inte" });
    }

    return res
      .status(200)
      .json({ message: `noten med itemId:${itemId} raderat` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "kunde inte deleta note", error: err.message });
  }
};

export const updateNote = async (req, res) => {
  const { title, text, itemId } = req.body;
  try {
    const result = await updateNoteInDb(
      // skickar in query vilket id som ska uppdaters,itemId
      { itemId: itemId },
      // vad som ska uppdateras, och lägger till modified
      {
        $set: {
          title: title,
          text: text,
          modifiedAt: new Date().toLocaleString("sv-SE"),
        },
      },
      { multi: false }
    );
    if (result === 0) {
      return res
        .status(404)
        .json({ message: "ingen note hittades att uppdatera" });
    }

    const updatedNote = await findSpecifikNoteInDb(itemId);
    res.status(200).json({
      message: `${itemId} uppdaterades korrekt!`,
      newUpdatedVersion: updatedNote,
    });
    console.log("RESULT", result);
    // 0 OM INGEN NOTE HITTAS, ANNARS 1
  } catch (err) {
    res
      .status(500)
      .json({ message: "kunde inte uppdatera note", error: err.message });
  }
};

export const findNote = async (req, res) => {
  //   const { title } = req.query;
  const { title } = req.validatedQuery;
  try {
    const result = await searchNoteByTitleInDb(title);
    console.log("RESULT", result);
    if (result.length === 0) {
      return res.status(200).json({
        // kör 200 för de är inget fel de är bara de att de inte
        /// finns nån titel me de queryn jag satt in
        message: "inga note/s hittades med den titeln!",
        notes: result,
      });
    }

    return res.status(200).json({ message: "note/s hittades!", notes: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "kunde inte hitta noten", error: err.message });
  }
};
