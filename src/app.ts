import express from "express";
import { createServer } from "http";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import middlewares from "./middlewares";
import api from "./api";
import auth from "./auth";
import database from "./database";
import { socketIO } from "./socket";

dotenv.config();

const app = express();
const httpServer = createServer(app);

socketIO(httpServer)

app.use(helmet());
app.use(
  morgan(
    ":remote-addr :remote-user :method :url HTTP/:http-version :status - :response-time ms"
  )
);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World - 👋🌏🌎🌍",
  });
});

/**
 * Remove comment to enable auth verification to access the api
 */
app.use("/auth", auth);
app.use("/tes", database);

// app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default httpServer;
