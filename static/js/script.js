const rows = document.querySelectorAll(".row");
rows.forEach((row) => {
  row.addEventListener("click", () => {
    rows.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");
    openMusicInfo();
  });
});


function openMusicInfo() {
let element = document.getElementById("content_menu_animation_id");
element.style.display = "block";
};
  

document.getElementById("site_name").addEventListener("click", () => {



 ////////////Убирает правую часть и очищает все выбраные row/////////////

  let rightSide = document.getElementById("content_menu_animation_id");
  rightSide.style.display = "none";

  rows.forEach((row) => { 
    if (row.getAttribute("aria-selected") === "true") {
      row.setAttribute("aria-selected", "false");
    }
  });


 ////////////Смена фона при нажатии на название сайта////////////////////

  // const videos = [
  //   "./static/vid/body_background_vid.mp4",
  //   "./static/vid/test1.mp4",
  //   "./static/vid/test2.mp4",
  //   "./static/vid/test3.mp4",
  //   "./static/vid/test4.mp4",
  //   "./static/vid/test5.mp4",
  // ];

  // const videoElement = document.getElementById("back_vid");
  // const randomIndex = Math.floor(Math.random() * videos.length);
  // videoElement.src = videos[randomIndex];
  // videoElement.load();
  // videoElement.play();
});
