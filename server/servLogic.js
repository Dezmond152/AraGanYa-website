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

const rowPattern = (icon, name, author) => `
<div class="row" id="rw1" aria-selected="false">
   <div class="row_grid">
    <img class="song_image" src="${icon}" alt="#" />
     <div class="song_info_container">
       <div class="song_name">${name}</div>
       <div class="song_author">${author}</div>
      </div>
   </div>
</div>`;


async function getHTMLrandSong() {
  const connection = await mysql2.createConnection(dbConfig);

  const songsRangeQuery = `SELECT COUNT(*) AS total FROM songs`;
  const [result] = await connection.query(songsRangeQuery);

  const allSongs = result[0].total;
  log(`Количество песен: ${allSongs}`); //Количество песен в бд

  if (allSongs === 0) {
    log("Нет доступных песен.");
    await connection.end();
    return;
  }

  const randomNumbers = new Set();
  let wantRange = 10; // Указываем желаемое количество песен

  while (randomNumbers.size < wantRange) {
    const randomNumber = Math.floor(Math.random() * allSongs) + 1;
    randomNumbers.add(randomNumber);
  }

  const randomNumbersArray = Array.from(randomNumbers);
  log("Случайные номера песен:", randomNumbersArray); //айди рандомных песен
  
  const randomSongsQuery = `SELECT name, author, icon, file FROM songs WHERE id IN (${randomNumbersArray.join(',')})`;
  const [randomSongsArray] = await connection.query(randomSongsQuery);
  
  if (randomSongsArray.length === 0) {
    log("Нет найденных песен с указанными ID.");
  } else {
    log("Песни полученны: "); // Рандомные песни из бд , randomSongsArray
  }

  const htmlPatern = randomSongsArray.map(song => rowPattern(song.icon, song.name, song.author)).join('');
  log("HTML Pattern:"); //, htmlPatern

  const indexPath = path.join(__dirname, "../views", "index.html");
  let indexHTML = fs.readFileSync(indexPath, 'utf8');

  indexHTML = indexHTML.replace('<div class ="replase"></div>', htmlPatern);


  await connection.end(log('Конектион закрыт, бай бай.'));
  return indexHTML;
};

module.exports = {getHTMLrandSong};
