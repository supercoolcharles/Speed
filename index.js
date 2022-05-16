const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const articles = require('./routes/api/articles');
const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/api/articles', articles);
app.use(express.static("build"));

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./speed/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./speed/build", "index.html"));
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));