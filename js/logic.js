export { deletePastContentMenu, createMusicInfo, createrRowInteraction, rowclickPlay, hoverSFXPlay};

const contentMenuFlex = document.getElementById("content_menu_flex_id");
const songVolumeRange = document.getElementById("song_Volume");
const sfxVolumeRange = document.getElementById("sfx_Volume");
const defaultButton = document.getElementById("default_button");
const stopButton = document.getElementById("stop_button");
const tuneMenuImg = document.querySelector(".tune_menu_img");
const closeButton = document.querySelector(".close_zone");
const tuneMenu = document.querySelector(".tune_menu");
const rowList = document.querySelectorAll(".row");

const rowclick = new Audio("/sfx/row_clickSFX.wav");
const hoverSFX = new Audio("/sfx/hoverSFX.wav");

rowclick.volume = 0.5;
hoverSFX.volume = 0.5;
let currentAudio = null;
let currentAudioVolume = 50;

let curentSongBanner = "bo";
let curentSongName = "bo";
let curentSongAuthor = "bo";
let curentSongLyrics = "bo";



function createrRowInteraction(){
  rowList.forEach((row) => {
    row.addEventListener("click", () => {
      rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
      row.setAttribute("aria-selected", "true");
  
      let songPath = row.getAttribute("data-path");
      let bannerPath = row.getAttribute("banner-path");
      let lyrics = row.getAttribute("lyrics-path");
      
      console.log(songPath);
      console.log(bannerPath);
      console.log(lyrics);
  
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
};


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




function deletePastContentMenu() {
  if (contentMenuFlex.childElementCount > 3) {
    setTimeout(() => contentMenuFlex.firstElementChild.remove(), 400);
  }
}

function createMusicInfo() {
  let htmlPattern = `
  <div class="content_menu_animation" id="content_menu_animation_id">
    <div class="content_menu_frame_red">
      <div class="content_menu_frame_gray">
        <div class="content_flex">
          <div class="content_menu_top_bar">
            <img class="music_banner" src="${curentSongBanner}">
          </div>
          <div class="content_info_bar_flex">
            <div class="content_song_name">${curentSongName}</div>
            <div class="content_song_author">${curentSongAuthor}</div>
          </div>
          <div class="song_lyrics">
            ${curentSongLyrics}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  if (contentMenuFlex.childElementCount < 5) {
    contentMenuFlex.insertAdjacentHTML("beforeend", htmlPattern);
  } else {
    console.log("лимит, сука");
  }
}

























