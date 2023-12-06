import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from "cors";

//importing routes

import userRouter from "./routes/User.js";
import passwordRouter from "./routes/passwordReset.js";
import redditRouter from "./routes/redditRouter.js";
import facebookRouter from "./routes/facebookRouter.js";
import youtubeRouter from "./routes/youtubeRouter.js";

//importing custom middlewares
import { errorMiddleware } from "./middlewares/errorHandler.js";

export const app = express();

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// For accepting post data in json
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3006", process.env.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Configurations for "Static-files"
app.set("views", path.join(__dirname, "views"));

// Custom middleware for serving static files with CORS headers
app.use("/public", (req, res, next) => {
  // Set CORS headers to allow requests from both origins
  res.header("Access-Control-Allow-Origin", "http://localhost:3006");
  res.header("Access-Control-Allow-Methods", "GET"); // Add more methods if needed
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Add more headers if needed

  // Continue to serve the static files
  express.static("public")(req, res, next);
});

app.use("/api/v01/users", userRouter);
app.use("/api/v01/password-reset", passwordRouter);
app.use("/api/v01/reddit", redditRouter);
app.use("/api/v01/facebook", facebookRouter);
app.use("/api/v01/youtube", youtubeRouter);

app.use("/", (req, res) => {
  res.status(200).render("index");
});

app.use(errorMiddleware);
