let contentMenuFlex = document.getElementById("content_menu_flex_id");
const rowList = document.querySelectorAll(".row");

rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");

    openMusicInfo()
    closePastContentMenu()
  });
});
  
function closePastContentMenu() {
  if (contentMenuFlex.childElementCount > 3) {
    setTimeout(() => contentMenuFlex.firstElementChild.remove(), 400);
  }
}


function openMusicInfo() {
  let htmlPattern = `
  <div class="content_menu_animation" id="content_menu_animation_id">
    <div class="content_menu_frame_red">
      <div class="content_menu_frame_gray">
        <div class="content_flex">
          <div class="content_menu_top_bar">
            <img class="music_banner"src="./images/banner.jpg">
          </div>
          <div class="content_info_bar_flex">
            <div class="content_song_name">MY TIME</div>
            <div class="decor_gap">-</div>
            <div class="content_song_author">BO EN</div>
          </div>
          <div class="song_lyrics">
            Test
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  if(contentMenuFlex.childElementCount < 5){
    contentMenuFlex.insertAdjacentHTML("beforeend", htmlPattern);
  } else{console.log("лимит, сука");};
};


// ТЕСТ БЭКГРАУНД ВИДЕО //
document.getElementById("site_name").addEventListener("click", () => {

  const videos = [
    "./vid/body_background_vid.mp4",
    "./vid/test1.mp4",
    "./vid/test2.mp4",
    "./vid/test3.mp4",
    "./vid/test4.mp4",
    "./vid/test5.mp4",
  ];

  const videoElement = document.getElementById("back_vid");
  const randomIndex = Math.floor(Math.random() * videos.length);
  videoElement.src = videos[randomIndex];
  videoElement.load();
  videoElement.play();
});
