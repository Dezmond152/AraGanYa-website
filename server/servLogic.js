const mysql = require("mysql2");
const { log, error } = require("console");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dezmond152",
  database: "araganya",
});

const rowPattern = (imgSrc, songName, author) => `
<div class="content_menu_animation" id= "content_menu_animation_id">
 <div class="content_menu_frame_red">
      <div class="content_menu_frame_gray">
        <div class="content_flex">
          <div class="content_menu_top_bar">
            <img class="music_banner" src="${imgSrc}">
          </div>
          <div class="content_info_bar_flex">
            <div class="content_song_name">${songName}</div>
            <div class="decor_gap">-</div>
            <div class="content_song_author">${author}</div>
          </div>
          <div class="song_lyrics">
            Test
          </div>
        </div>
      </div>
    </div>
  </div>`;

// БАЗА ДАННЫХ
const createRow = () => {
  connection.connect((err) => {
    err
      ? console.error("Ошибочка:", err.stack)
      : console.log(connection.threadId);
    return;
  });

  connection.query(
    "SELECT name FROM songs WHERE user_id = 1;",
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
    }
  );

  connection.end((err) => {
    if (err) {
      console.error("Ошибочка закрытия соеденения: ", err.stack);
      return;
    }
    console.log("Соеденение закрыто");
  });

  const imgSrc = '-';
  const songName  = '-';
  const author = '-';
  res.send(createRowPattern(imgSrc, songName, author));


};

module.exports = {
    createRow,
};
