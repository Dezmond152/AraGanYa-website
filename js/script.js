let contentMenuFlex = document.getElementById("content_menu_flex_id");
const rowList = document.querySelectorAll(".row");

rowList.forEach((row) => {
  row.addEventListener("click", () => {
    rowList.forEach((row) => row.setAttribute("aria-selected", "false"));
    row.setAttribute("aria-selected", "true");

    openMusicInfo();
    closePastContentMenu();
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
            <img class="music_banner" src="../images/banner.jpg">
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
