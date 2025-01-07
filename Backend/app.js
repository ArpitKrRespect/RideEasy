import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"; 

import connectDB from "./db/db.js";
const app = express();

app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
