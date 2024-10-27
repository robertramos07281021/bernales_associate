import express from "express";
const app = express();
import mongoose from "mongoose";
import "dotenv/config.js";
import { dashboardRouter } from "./expressRoutes/routes/dashboardRoute.js";
import { userRouter } from "./expressRoutes/routes/userRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/client/dist")));
app.use("/assets", express.static(path.join(__dirname, "/client/assets")));
app.use("/api/bernales/user", userRouter);
app.use("/api/bernales", dashboardRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

mongoose
  .connect(process.env.DB_URI, { dbName: "bernales_db" })
  .then(() => console.log("MongoDB database connected!"))
  .catch((err) => console.log(err));

// .connect("mongodb://127.0.0.1:27017/bernales_db")
// .then(() => console.log("Mongodb database connected!"))
// .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`app is running on http://localhost:${process.env.PORT}`);
});
