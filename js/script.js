import { deletePastContentMenu, createMusicInfo, pullSongFromBd} from "./logic.js";

const songVolumeRange = document.getElementById("song_Volume");
const sfxVolumeRange = document.getElementById("sfx_Volume");
const defaultButton = document.getElementById("default_button");
const stopButton = document.getElementById("stop_button");
const searchBar = document.getElementById("search_bar");


let sex = 1;

const rowclick = new Audio("/sfx/row_clickSFX.wav");
const hoverSFX = new Audio("/sfx/hoverSFX.wav");

rowclick.volume = 0.5;
hoverSFX.volume = 0.5;
let currentAudio = null;
let currentAudioVolume = 50;

const rowList = document.querySelectorAll(".row");


rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");

    let songPath = row.getAttribute("data-path");

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(songPath);
    currentAudio.volume = currentAudioVolume / 100;
    currentAudio.loop = true;
    currentAudio.play();
 
    rowclickPlay();            
    createMusicInfo();        
    deletePastContentMenu();    
  }); 

  row.addEventListener("mouseenter", () => {
    hoverSFXPlay();
  });
});

songVolumeRange.addEventListener("input", () => {
  currentAudioVolume = songVolumeRange.value;
  if (currentAudio) {
    currentAudio.volume = currentAudioVolume / 100;
  }
});


//Блок SfX
function rowclickPlay() {
  rowclick.currentTime = 0;
  rowclick.play();
}

function hoverSFXPlay() {
  hoverSFX.currentTime = 0;
  hoverSFX.play();
}

sfxVolumeRange.addEventListener("input", () => {
  const sfxValue = sfxVolumeRange.value / 100;
  hoverSFX.volume = sfxValue;
  rowclick.volume = sfxValue;
});

//Меню регулировки звука
const tuneMenuImg = document.querySelector(".tune_menu_img");
const closeButton = document.querySelector(".close_zone");
const tuneMenu = document.querySelector(".tune_menu");

tuneMenuImg.addEventListener("click", () => {
  tuneMenu.classList.toggle("active");
  tuneMenuImg.classList.toggle("active");
  rowclickPlay();
});

closeButton.addEventListener("click", () => {
  tuneMenu.classList.remove("active");
  rowclickPlay();
});

defaultButton.addEventListener("click", () => {
  hoverSFX.volume = 0.5; 
  rowclick.volume = 0.5; 
  if (currentAudio) { 
    currentAudio.volume = 0.5;
    currentAudioVolume = 50;
  }
  songVolumeRange.value = 50;
  sfxVolumeRange.value = 50;
});

stopButton.addEventListener("click", () => {
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currntTime = 0;
  }
});

//Строка поиска
searchBar.addEventListener("search", () => {
  let searchResault = searchBar.value;
  console.log(searchResault);
  pullSongFromBd(searchResault);
});


//Закрытие гайда
const conformationButton = document.querySelector("#conformation_button");
const guide = document.querySelector("#guide");
conformationButton.addEventListener("click", () => {
  guide.style.display = "none";
});





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

});


