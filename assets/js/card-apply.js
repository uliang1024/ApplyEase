$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-nav",
  centerMode: true,
});

$(".slider-nav").slick({
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  dots: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: true,
        focusOnSelect: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: true,
        focusOnSelect: true,
      },
    },
  ],
});

$("a[data-slide]").click(function (e) {
  e.preventDefault();
  var slideno = $(this).data("slide");
  $(".slider-nav").slick("slickGoTo", slideno - 1);
});

// ----------------

const tabs = document.querySelectorAll(".tabs .tab");
const cardShow = document.querySelector("#card-show");
const sliderFor = document.querySelector(".slider-for");
const sliderNav = document.querySelector(".slider-nav");
let cardsDate = "";
let requestURL =
  "https://raw.githubusercontent.com/uliang1024/ApplyEase/main/data/json/cards.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
  cardsDate = request.response;
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    const selectedLabel = tab.innerText.trim();

    const selectedCards = cardsDate[selectedLabel]; // 获取选定标签的卡片数组

    // 移除旧的轮播内容
    $(".slider-for").slick("slickRemove", null, null, true);
    $(".slider-nav").slick("slickRemove", null, null, true);

    selectedCards.forEach((card, index) => {
      createCard(card, index);
    });
    window.scrollTo(0, scrollPosition);
  });
});

// 创建单个卡片的函数
function createCard(card, index) {
  const slideForContent = `
    <div class="slick-slide">
      <div class="ratio ratio-16x9">
        <img
          src="${card.src}"
          class="img-fluid rounded mx-auto d-block h-100"
          alt="${card.alt}"
        />
      </div>
      <h5 class="text-center pt-3">${card.alt}</h5>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault${index}"
        />
        <label
          class="form-check-label"
          for="flexRadioDefault${index}"
        >選擇此卡</label>
      </div>
    </div>
  `;

  const slideNavContent = `
    <div class="card" style="width: 18rem">
      <div class="ratio ratio-16x9">
        <img
          src="${card.src}"
          class="img-fluid rounded mx-auto d-block h-100"
          alt=""
        />
      </div>
    </div>
  `;

  // 使用 slickAdd 方法添加新的内容
  $(".slider-for").slick("slickAdd", slideForContent);
  $(".slider-nav").slick("slickAdd", slideNavContent);
}

// --------------
