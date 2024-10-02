const rowList = document.querySelectorAll(".row");

import { closePastContentMenu, openMusicInfo } from "./logic.js";

rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");

    openMusicInfo();
    closePastContentMenu();
  });
});



const api = "https://jsonplaceholder.typicode.com/users";



async function showClientList() {
  const response = await fetch(api)
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log("Error HTTP: " + response.status);
  }
}
showClientList();

