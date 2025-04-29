import Datastore from "nedb-promises";
const notesDb = new Datastore({
  filename: "./database/notes.db",
  autoload: true,
});

export const findNotesInDb = async (userId) => {
  return await notesDb.find({ userId: userId });
};

export const findSpecifikNoteInDb = async (itemId) => {
  return await notesDb.find({ itemId: itemId });
};

export const insertNotesInDb = async (noteObj) => {
  return await notesDb.insert(noteObj);
};

export const updateNoteInDb = async (query, updates, options) => {
  return await notesDb.update(query, updates, options);
};

export const deleteNoteInDb = async (itemId) => {
  return await notesDb.remove({ itemId: itemId });
};

export default notesDb;
