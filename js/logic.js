const contentMenuFlex = document.getElementById("content_menu_flex_id");


export function closePastContentMenu() {
  if (contentMenuFlex.childElementCount > 3) {
    setTimeout(() => contentMenuFlex.firstElementChild.remove(), 400);
  }
}

export function openMusicInfo() {
  let htmlPattern = `
  <div class="content_menu_animation" id="content_menu_animation_id">
    <div class="content_menu_frame_red">
      <div class="content_menu_frame_gray">
        <div class="content_flex">
          <div class="content_menu_top_bar">
            <img class="music_banner" src="${1}">
          </div>
          <div class="content_info_bar_flex">
            <div class="content_song_name">${1}</div>
            <div class="decor_gap">-</div>
            <div class="content_song_author">${1}</div>
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



// let htmlRowPattern;

// fetch('http://localhost:3000/')
//   .then(res => {
//     if(!res.ok) {throw new Error('Network response was not ok')}
//     return res.text();
//   })
//   .then(http => {
//     htmlRowPattern = http;
//   })
//   .catch(error => {
//     console.error('Problem with the fetch operation:', error);
//   });

//   console.log(htmlRowPattern);