const express = require("express");
const path = require("path");
const { getHTMLrandSong } = require('./servLogic');
const { log } = require("console");

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
  "sfx"
];



staticPath.forEach((dir) => {
  app.use(`/${dir}`, express.static(path.join(__dirname, `../${dir}`)));
});



app.get("/", async (req, res) => {
  try {
    const pathAndHTMLobj = await getHTMLrandSong();
    res.send(pathAndHTMLobj.str);
  } catch (err) {
    console.error("Ошибка при получении indexHTML:", err);
    res.status(500).send("Ошибка сервера.");
  }
});

app.get("/sfx", async (req, res) =>{
  try {
    const pathAndHTMLobj = await getHTMLrandSong();
    res.send(pathAndHTMLobj.arr);
  } catch (err) {
    console.error("Ошибка при получении fileAndId:", err);
    res.status(500).send("Ошибка сервера.");
  }
});


