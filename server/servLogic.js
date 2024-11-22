const mysql2 = require("mysql2/promise");
const path = require("path");
const fs = require('fs');
const { log, error } = require("console");
const { waitForDebugger } = require("inspector");
const { resolve } = require("path");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "dezmond152",
  database: "araganya",
};

const rowPattern = (id, icon, name, author, file) => `
<div class="row" id="${id}" data-path="${file}" aria-selected="false">
  <div class="row_grid">
      <img class="song_image" src="${icon}" alt="#" />
      <div class="song_info_container">
        <div class="song_name">${name}</div>
        <div class="song_author">${author}</div>
      </div>
  </div>
</div>`;

async function getHTMLrandSong() {
  const songsRangeQuery = `SELECT COUNT(*) AS total FROM songs`;
  let wantRange = 5; 

  const connection = await mysql2.createConnection(dbConfig);
  const [result] = await connection.query(songsRangeQuery);
  
  const allSongs = result[0].total;

  const randomNumbers = new Set();
  while (randomNumbers.size < wantRange) {
    const randomNumber = Math.floor(Math.random() * allSongs) + 1;
    randomNumbers.add(randomNumber);
  }

  const randomNumbersArray = Array.from(randomNumbers);
  
  const randomSongsQuery = `SELECT name, author, icon, id, file FROM songs WHERE id IN (${randomNumbersArray.join(',')})`;
  const [randomSongsArray] = await connection.query(randomSongsQuery);
  
  const htmlPatern = randomSongsArray.map(song => rowPattern(song.id, song.icon, song.name, song.author, song.file)).join('');
  const indexPath = path.join(__dirname, "../views", "index.html");
  let indexHTML = fs.readFileSync(indexPath, 'utf8');
  indexHTML = indexHTML.replace('<div class ="replase"></div>', htmlPatern);

  await connection.end();

  

  return {indexHTML, htmlPatern};
};

module.exports = {getHTMLrandSong};
