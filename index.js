const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const articles = require('./routes/api/articles');
const app = express();
require("dotenv").config({ path: "./config.env" });

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/api/articles', articles);

const path = require("path");

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get("*",(req, res) => {
      res.sendFile(path.join(__dirname, "client","build","index.html"));
  });
}else{
  app.get("/", (req, res) => {
      res.send("Api running");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));