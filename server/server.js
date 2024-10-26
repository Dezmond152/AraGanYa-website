const express = require("express");
const path = require("path");
const {createRow} = require('./servLogic');

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log('Сервер запущен на порту 3000'));

const staticPath = [
  "database",
  "fonts",
  "images",
  "js",
  "server",
  "vid",
  "styles",
  "views",
];

staticPath.forEach((dir) => {
  app.use(`/${dir}`, express.static(path.join(__dirname, `../${dir}`)));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

app.get('/', (req, res) =>{
  createRow();
}); 



