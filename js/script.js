import { createrRowInteraction, pullSongFromBd, updateRowList } from "./logic.js";

createrRowInteraction();

//Обновление списка песен при нажатии имени сайта
document.getElementById("site_name").addEventListener("click", async () => {
  async function fetchHTML(url) {
    const response = await fetch(url);
    const html = await response.text();
    return html; 
  }
  const htmlPattern = await fetchHTML('http://localhost:3000/sfx');
  const musicListContainer = document.querySelector("#music_list_container");

  musicListContainer.innerHTML = htmlPattern;

  updateRowList(); 
  createrRowInteraction();
});



//Закрытие гайда
const conformationButton = document.querySelector("#conformation_button");
const guide = document.querySelector("#guide");
conformationButton.addEventListener("click", () => {
  guide.style.display = "none";
});


//Строка поиска
const searchBar = document.getElementById("search_bar");
searchBar.addEventListener("search", () => {
  let searchResault = searchBar.value;
  pullSongFromBd(searchResault);
});

