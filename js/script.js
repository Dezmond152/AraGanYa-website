const rowList = document.querySelectorAll(".row");

import { closePastContentMenu, openMusicInfo, sendMusRecomendation } from "./logic.js";

rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");

    openMusicInfo();
    closePastContentMenu();
  });
});

// sendMusRecomendation();
