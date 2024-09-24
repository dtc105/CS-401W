import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


// Routers

import userRouter from "./routes/User.js";
app.use("/user", userRouter);

import plannerRouter from "./routes/Planner.js";
app.use("/planner", plannerRouter);

const PORT = 5174;
app.listen(PORT, console.log("Server listening on port:", PORT));