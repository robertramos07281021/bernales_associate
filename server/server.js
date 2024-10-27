import express from "express";
const app = express();
import mongoose from "mongoose";
import "dotenv/config.js";
import { dashboardRouter } from "./expressRoutes/routes/dashboardRoute.js";
import { userRouter } from "./expressRoutes/routes/userRoute.js";
app.use(express.json());

app.use("/api/bernales/user", userRouter);
app.use("/api/bernales", dashboardRouter);

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
