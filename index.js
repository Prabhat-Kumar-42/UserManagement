const express = require("express");
const { connectMongoDb } = require("./connection.js");
const userRouter = require("./routes/users.js");

connectMongoDb("mongodb://127.0.0.1:27017/nodejs-practice");

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.json());

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("Server Started");
});
