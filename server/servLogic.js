const mysql2 = require("mysql2/promise");
const { log, error } = require("console");
const { waitForDebugger } = require("inspector");
const { resolve } = require("path");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "dezmond152",
  database: "araganya",
};

const rowPattern = (bannerSrc, songName, author) => `
<div class="row" id="rw1" aria-selected="false">
   <div class="row_grid">
    <img class="song_image" src="#" alt="#" />
     <div class="song_info_container">
       <div class="song_name">Test</div>
       <div class="song_author">Test</div>
      </div>
   </div>
</div>`;


async function mainFunction() {
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
  let wantRange = 3; // Указываем желаемое количество песен

  while (randomNumbers.size < wantRange) {
    const randomNumber = Math.floor(Math.random() * allSongs) + 1;
    randomNumbers.add(randomNumber);
  }

  const randomNumbersArray = Array.from(randomNumbers);
  log("Случайные номера песен:", randomNumbersArray); //айди рандомных песен
  
  const randomSongsQuery = `SELECT name, author, icon, file FROM songs WHERE id IN (${randomNumbersArray.join(',')})`;
  const [randomSongsArray] = await connection.query(randomSongsQuery);
  log("Полученные песни:", randomSongsArray); // Рандомные песни из бд

  if (randomSongsArray.length === 0) {
    log("Нет найденных песен с указанными ID.");
  } else {
    log("Полученные песни:", randomSongsArray);
  }


  await connection.end(log('Конектион закрыт, бай бай.'));
};
mainFunction() 

module.exports = {};
