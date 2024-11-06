import {closePastContentMenu, openMusicInfo, playhoverSFX, rowclickSFX} from "./logic.js";
const rowList = document.querySelectorAll(".row");

rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");
    
    rowclickSFX()
    openMusicInfo();
    closePastContentMenu();
  });

  row.addEventListener("mouseenter", () => {
    playhoverSFX();
  });
});











document.getElementById("site_name").addEventListener("click", () => {
  location.reload();
});