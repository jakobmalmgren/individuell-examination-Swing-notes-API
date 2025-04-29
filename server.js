import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import notesRouter from "./routes/noteRouter.js";
import { checkAuth } from "./middlewares/checkAuth.js";

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use("/api/user", userRouter);
app.use("/api/notes", checkAuth, notesRouter);

app.listen(PORT, () => {
  console.log(`servern kör på http://localhost:${PORT}`);
});
