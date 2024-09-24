// const express = require("express");
import express from "express";
const app = express();
// const cors = require("cors");
import cors from "cors";

app.use(express.json());
app.use(cors());


// Routers

// const userRouter = require("./routes/User.js");
import router from "./routes/User.js";
app.use("/user", router);

// const plannerRouter = require("./routes/Planner.js");
// app.use("/planner", plannerRouter);

const PORT = 5174;
app.listen(PORT, console.log("Server listening on port:", PORT));