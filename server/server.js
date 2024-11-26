const { getHTMLrandSong ,findSonginDB} = require('./servLogic');

const express = require("express");
const path = require("path");
const { log } = require("console");
const { type } = require("os");

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
    const { indexHTML, htmlPatern } = await getHTMLrandSong();
    res.send(indexHTML);
  } catch (err) {
    console.error("Ошибка при получении indexHTML:", err);
    res.status(500).send("Ошибка сервера.");
  }
});


app.get("/sfx", async (req, res) => {
  try {
    const { indexHTML, htmlPatern } = await getHTMLrandSong();
    res.send(htmlPatern);
  } catch (err) {
    console.error("Ошибка при получении indexHTML:", err);
    res.status(500).send("Ошибка сервера.");
  }
});

app.use(express.json());
app.post("/AraGanYa/songs", async (req, res) => {
  const inputData = req.body.searchResault;
  const processedData = await findSonginDB(inputData);
  
  res.json(processedData);
});