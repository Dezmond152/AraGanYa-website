const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const { log, error } = require("console");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dezmond152',
  database: 'araganya'
});




connection.connect((err) => {
  err ? console.error('Ошибочка:', err.stack) : console.log(connection.threadId);
  return;
});

connection.query('SELECT name FROM songs WHERE user_id = 1;', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end((err) => {
  if(err){
    console.error('Ошибочка закрытия соеденения: ', err.stack);
    return;
  }
  console.log('Соеденение закрыто');
});