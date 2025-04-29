import bcrypt from "bcrypt";
export const hashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.error("Fel vid hashning av lösenord: ", err);
    throw new Error("Fel vid hashning av lösenord.");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  const checkIfMatch = await bcrypt.compare(password, hashedPassword);
  return checkIfMatch;
};
