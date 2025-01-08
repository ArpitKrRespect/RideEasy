import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"; 
import userRoutes from "./routes/user.routes.js";

import connectDB from "./db/db.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", userRoutes);


export default app;
