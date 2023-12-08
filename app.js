const express = require("express");
const morgan = require('morgan');
const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  return res.json("Ready");
});

app.use(userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "SOMETHING WENT WRONG!",
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "failed",
    error: "Method and EndPoint Not Found",
  });
});

module.exports = app;
