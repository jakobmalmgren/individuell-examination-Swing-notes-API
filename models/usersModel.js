// måste kolla upp cb på vanliga nedb o async på nedb prpmises!!!!!!!!

//USERS DATABAS

import { v4 as uuidv4 } from "uuid";
import Datastore from "nedb-promises";
const usersDb = new Datastore({
  filename: "./database/users.db",
  autoload: true,
});

// HITTA USER KOPPLADE TILL USERS DB
export const findUser = async (username) => {
  const users = await usersDb.find({ username: username });
  //   console.log("users", users);
  return users;
};

// LÄGGA TILL USER I DB KOPPLADE TILL USERS DB
export const createUserToDb = async (username, hashedpassword) => {
  const createdUser = await usersDb.insert({
    username: username,
    password: hashedpassword,
    id: uuidv4(),
  });
  return createdUser;
};

export default usersDb;
