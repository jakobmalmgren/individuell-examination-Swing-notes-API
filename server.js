import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import notesRouter from "./routes/noteRouter.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      description: "API for notes",
      title: "Swing notes API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

const app = express();
dotenv.config();
app.use(express.json());
const swaggerDocs = swaggerJSDoc(swaggerOptions);
const PORT = process.env.PORT || 8000;

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/user", userRouter);
app.use("/api/notes", checkAuth, notesRouter);

// global errorhandler

app.use((err, req, res, next) => {
  console.log("global error!:", err.stack || err);
  res.status(err.status || 500).json({ message: err.message || "serverfel" });
});

app.listen(PORT, () => {
  console.log(`servern kör på http://localhost:${PORT}`);
});
