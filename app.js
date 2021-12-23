const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

dotenv.config({ path: "./config.env" });

require("./DB/conn");

app.use(express.json());

app.use(cookieParser());

// app.get("/", (req, res) => res.status(200).send("hello world"));
app.use("/app", require("./Router/routes"));
// app.use(require("./Router/routes"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("form/build"));
}

app.get("*", (_, res) =>
  res.sendFile(path.resolve("form", "build", "index.html"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is runnung on port ${PORT}`);
});
