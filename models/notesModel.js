import Datastore from "nedb-promises";
const notesDb = new Datastore({
  filename: "./database/notes.db",
  autoload: true,
});
//NOTES DATABAS
// SKAPAR FUNKTIONER SOM ÄR KOPPLADE TILL NOTESDB

// hittar alla notes med de userId
export const findNotesInDb = async (userId) => {
  return await notesDb.find({ userId: userId });
};
//hittar den noten med specifika itemId genom queryn
export const findSpecifikNoteInDb = async (itemId) => {
  return await notesDb.findOne({ itemId: itemId });
};
//lägger till note i db
export const insertNotesInDb = async (noteObj) => {
  return await notesDb.insert(noteObj);
};
//uppdaterar note i db
export const updateNoteInDb = async (query, updates, options) => {
  return await notesDb.update(query, updates, options);
};
//deletar note i db
export const deleteNoteInDb = async (itemId) => {
  return await notesDb.remove({ itemId: itemId });
};
//söker efter note via title i db
export const searchNoteByTitleInDb = async (title) => {
  return await notesDb.find({ title: new RegExp(title, "i") });
  // gör så de inte är casesensitive pluss om jag ex
  // vill hitta en title som är "jakob" så räcker de man skriver j som kommer
  //jakob upp
};

export default notesDb;
