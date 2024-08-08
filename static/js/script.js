const rows = document.querySelectorAll(".row");
rows.forEach((row) => {
  row.addEventListener("click", () => {
    rows.forEach((e) => e.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");
    openMusicInfo();
  });
});


// function openMusicInfo() {
//   document.getElementById("content_menu_flex_id").style.display = "flex";
//   };
  
























// document.getElementById("site_name").addEventListener("click", () => {

//   const videos = [
//     "./static/vid/body_background_vid.mp4",
//     "./static/vid/test1.mp4",
//     "./static/vid/test2.mp4",
//     "./static/vid/test3.mp4",
//     "./static/vid/test4.mp4",
//     "./static/vid/test5.mp4",
//   ];

//   const videoElement = document.getElementById("back_vid");
//   const randomIndex = Math.floor(Math.random() * videos.length);
//   videoElement.src = videos[randomIndex];
//   videoElement.load();
//   videoElement.play();
// });
