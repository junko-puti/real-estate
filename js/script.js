
//////////////////////////////////////////////////
//Swiper
window.addEventListener('load', () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
  });
});


// スムーススクロール（ヘッダー高さ80px考慮）
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
//     const targetId = this.getAttribute('href');

//     if (targetId === "#") {
//       // href="#" の場合はページ最上部へ
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         const headerHeight = 80; // ヘッダーの高さ
//         const elementPosition = targetElement.getBoundingClientRect().top;
//         const offsetPosition = window.scrollY + elementPosition - headerHeight;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       }
//     }
//   });
// });



//////////////////////////////////////////////////
// triggerボタン、ドロワーメニュー開閉
$(function(){
  $('.c-btn-trigger').on('click', function() {
    $(this).toggleClass('active');
    $('#drawer').toggleClass('is-open');
    return false;
  });

  // メニュー内リンククリックで閉じる
  $('#drawer a').on('click', function() {
    $('#drawer').removeClass('is-open');
    $('.c-btn-trigger').removeClass('active');
  });

  // メニュー外クリックで閉じる
  $(document).on('click', function(e) {
    const $drawer = $('#drawer');
    const $btn = $('.c-btn-trigger');
    if (!$drawer.is(e.target) && $drawer.has(e.target).length === 0 &&
        !$btn.is(e.target) && $btn.has(e.target).length === 0) {
      $drawer.removeClass('is-open');
      $btn.removeClass('active');
    }
  });

  // スクロールでトップに戻ったら閉じる
  $(window).on('scroll', function() {
    if ($(window).scrollTop() === 0) {
      $('#drawer').removeClass('is-open');
      $('.c-btn-trigger').removeClass('active');
    }
  });
});



//////////////////////////////////////////////////
// メニュー背景色の変化---ABOUTエリアが画面の真ん中に来たら変更する
function updateHeaderClass() {
  const $about = $('#about');
  const headerHeight = $('.js-header').outerHeight(); // ヘッダーの高さを取得

  if ($about.length === 0 || !$about.offset()) return;

  const aboutOffset = $about.offset().top;
  const scrollPosition = $(window).scrollTop();
  const windowHeight = $(window).height();

  // if (scrollPosition + windowHeight / 2 > aboutOffset) {
  // if (scrollPosition >= aboutOffset) {//ページがスクロールして #about の上端が window の上端に達したら
  if (scrollPosition >= aboutOffset - headerHeight){//ヘッダーの高さ分を残して
    $('.js-header').addClass('is-colored');
  } else {
    $('.js-header').removeClass('is-colored');
  }
}

$(function () {
  updateHeaderClass();
  $(window).on('scroll', updateHeaderClass);
});



//////////////////////////////////////////////////
// モーダル
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("js-modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".p-modal__close");
const overlay = document.querySelector(".p-modal__overlay");

document.querySelectorAll(".p-card__item").forEach(cardItem => {
  const imgContainer = cardItem.querySelector(".p-card__img");
  const title = cardItem.querySelector(".p-card__title");

  const openModal = () => {
    const img = imgContainer.querySelector("img");

    modal.style.display = "block";
    modalImg.src = img.dataset.modal || img.src;

     // スクロールを止める
    document.body.classList.add("no-scroll");

    //タイトル改行指定
    const isSP = window.matchMedia("(max-width: 500px)").matches;
    captionText.innerHTML = title
      ? isSP
        ? title.innerHTML.trim() // <br>を含むHTMLをそのまま表示
        : title.textContent.trim().replace(/\n/g, ' ') // 改行を無視して1行に
      : '';

    $('.c-top-btn').removeClass('active');
  };

  imgContainer.onclick = openModal;
  title.onclick = openModal;
});

// 閉じるボタン、またはオーバーレイクリックで閉じる
closeBtn.onclick = overlay.onclick = function () {
  modal.style.display = "none";

  // スクロールを戻す
  document.body.classList.remove("no-scroll");

  $(window).trigger('scroll'); // 9.1状態を再評価
};



//////////////////////////////////////////////////
//スクロールトップボタンの変化
$(function(){
  //変数にクラスをいれる
  var btn = $('.c-top-btn');
  //スクロールしてページトップから100に達したらボタンを表示
  $(window).on('load scroll',function(){
     // 9.1モーダルが非表示かどうかを判定
    var isModalClosed = $('#myModal').css('display') === 'none';
    if ($(this).scrollTop() > 100 && isModalClosed) {
    // if($(this).scrollTop() > 100){
      btn.addClass('active');
      $('.c-top-btn').css('transition', '0.6s');
    }else{
      btn.removeClass('active');
      $('.c-top-btn').css('transition', '0.6s');
    }
  });
  //スクロールしてトップへ戻る
  btn.on('click',function(){
    $('body,html').animate({
      scrollTop: 0
    });
  });
});



//////////////////////////////////////////////////
//fade-in
$(window).on("scroll load", function() { // 初回ロード時にも実行
  $(".p-fade-in").each(function() {
    var scrollPosition = $(window).scrollTop() + $(window).height();
    var elementOffset = $(this).offset().top;

    if (scrollPosition > elementOffset) {
      $(this).addClass("visible");
    }
  });
});

