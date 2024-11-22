const contentMenuFlex = document.getElementById("content_menu_flex_id");

function deletePastContentMenu() {
  if (contentMenuFlex.childElementCount > 3) {
    setTimeout(() => contentMenuFlex.firstElementChild.remove(), 400);
  }
}

let SEX0 = "#";
let SEX1 = "MY TIME";
let SEX2 = "bo en";

function createMusicInfo() {
  let htmlPattern = `
  <div class="content_menu_animation" id="content_menu_animation_id">
    <div class="content_menu_frame_red">
      <div class="content_menu_frame_gray">
        <div class="content_flex">
          <div class="content_menu_top_bar">
            <img class="music_banner" src="${SEX0}">
          </div>
          <div class="content_info_bar_flex">
            <div class="content_song_name">${SEX1}</div>
            <div class="content_song_author">${SEX2}</div>
          </div>
          <div class="song_lyrics">
            Test
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

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function () {
    this.classList.add("scale-up");

    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.classList.remove("scale-up");
    }, 90);
  });
});





function pullSongFromBd(){


}









export { deletePastContentMenu, createMusicInfo, pullSongFromBd};
