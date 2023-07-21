const searchWrapper = document.querySelector(".search-wrapper");
const searchIcon = document.querySelector(".search-icon");
const searchClose = document.querySelector(".close");
const searchInput = document.querySelector(".search-input");

// 監聽搜索圖示的點擊事件，直接寫入函式內容
searchIcon.addEventListener("click", function (event) {
  searchWrapper.classList.toggle("active");
  event.preventDefault();
});

// 監聽關閉圖示的點擊事件，直接寫入函式內容
searchClose.addEventListener("click", function (event) {
  searchWrapper.classList.remove("active");
  searchInput.value = "";
  event.stopPropagation();
});

const header = document.getElementById("header");

function scrollAction() {
  let scrollAmount = window.scrollY;

  if (scrollAmount > 0) {
    header.style.backgroundColor = "#0000005c";
  } else {
    header.style.backgroundColor = "transparent";
  }
}

window.addEventListener("scroll", scrollAction);

const navbarToggleExternalContent = document.getElementById("navbarToggleExternalContent");
navbarToggleExternalContent.addEventListener('hidden.bs.collapse', event => {
  header.style.backgroundColor = "transparent";
})
navbarToggleExternalContent.addEventListener('show.bs.collapse', event => {
  header.style.backgroundColor = "#16295bdb";
})
