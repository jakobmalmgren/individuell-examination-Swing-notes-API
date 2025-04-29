// import { v4 as uuidv4 } from "uuid";
import Datastore from "nedb-promises";
const notesDb = new Datastore({
  filename: "./database/notes.db",
  autoload: true,
});

export const findNotesInDb = async (userId) => {
  return await notesDb.find({ userId: userId });
};

export const insertNotesInDb = async (noteObj) => {
  return await notesDb.insert(noteObj);
};

export const updateNoteInDb = async () => {
  return await notesDb.update({});
};

export const deleteNoteInDb = async (itemId) => {
  return await notesDb.remove({ itemId: itemId });
};

export default notesDb;
