import {closePastContentMenu, openMusicInfo, playhoverSFX, rowclickSFX} from "./logic.js";

const rowList = document.querySelectorAll(".row");
rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");
    
    rowclickSFX();
    openMusicInfo();
    closePastContentMenu();
  });

  row.addEventListener("mouseenter", () => {
    playhoverSFX();
  });
});

const tuneMenuImg = document.querySelector(".tune_menu_img");
const tuneMenu = document.querySelector(".tune_menu");
const closeButton = document.querySelector(".close_zone");

tuneMenuImg.addEventListener('click', () => {
  tuneMenu.classList.toggle('active');
  tuneMenuImg.classList.toggle('active');
  rowclickSFX();
});

closeButton.addEventListener('click', () => {
  tuneMenu.classList.remove('active');
  rowclickSFX();
});



document.getElementById("site_name").addEventListener("click", () => {
  location.reload();
});