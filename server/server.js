const express = require("express");
const path = require("path");
const { getHTMLrandSong } = require('./servLogic');

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
  "AraGanYa",
];



staticPath.forEach((dir) => {
  app.use(`/${dir}`, express.static(path.join(__dirname, `../${dir}`)));
});



app.get("/", async (req, res) => {
  try {
    const mainHTML = await getHTMLrandSong();
    res.send(mainHTML);
  } catch (err) {
    console.error("Ошибка при получении песен:", err);
    res.status(500).send("Ошибка сервера.");
  }
});





