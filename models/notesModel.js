import Datastore from "nedb-promises";
const notesDb = new Datastore({
  filename: "./database/notes.db",
  autoload: true,
});
// hittar alla notes med de userId
export const findNotesInDb = async (userId) => {
  return await notesDb.find({ userId: userId });
};
//hittar den noten med specifika itemId genom queryn
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

export const searchNoteByTitleInDb = async (title) => {
  return await notesDb.find({ title: new RegExp(title, "i") });
  // gör så de inte är casesensitive pluss om jag ex
  // vill hitta en title som är "jakob" så räcker de man skriver j som kommer
  //jakob upp
};

export default notesDb;
