require('dotenv').config()

const mongoose = require('mongoose')

const path = require("path")

app.use(express.static(path.resolve(__dirname, "./my-app/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
});

const port = process.env.PORT || 8080

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERROR', err))

const server = app.listen(port, () =>
  console.log(Server is running on port ${port})
)
