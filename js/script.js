//slick
$(document).ready(function(){
  $('.p-fv__slider').slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false, // フォーカス時に停止しない
    pauseOnHover: false, // ホバー時に停止しない
    pauseOnDotsHover: false // ドットホバー時に停止しない
  });
});


// スムーススクロール（ヘッダー高さ80px考慮）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === "#") {
      // href="#" の場合はページ最上部へ
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = 80; // ヘッダーの高さ
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = window.scrollY + elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});



// メニュー背景色の変化---ABOUTエリアが画面の真ん中に来たら変更する
function updateHeaderClass() {
  const $about = $('#about');
  if ($about.length === 0 || !$about.offset()) return;

  const aboutOffset = $about.offset().top;
  const scrollPosition = $(window).scrollTop();
  const windowHeight = $(window).height();

  if (scrollPosition + windowHeight / 2 > aboutOffset) {
    $('.js-header').addClass('is-colored');
  } else {
    $('.js-header').removeClass('is-colored');
  }
}

$(function () {
  updateHeaderClass();
  $(window).on('scroll', updateHeaderClass);
});



 // モーダル
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("js-modal-img");
var captionText = document.getElementById("caption");

// サムネイル画像をクリックしたときの処理
var images = document.querySelectorAll(".p-card__img img");
images.forEach(function(img) {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src; // クリックした画像をモーダルに表示
        // captionText.innerHTML = this.alt; // キャプションを設定
    }
});

// モーダル外をクリックしたときにモーダルを閉じる
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//スクロールトップボタンの変化
$(function(){
  //変数にクラスをいれる
  var btn = $('.c-top-btn');
  //スクロールしてページトップから100に達したらボタンを表示
  $(window).on('load scroll',function(){
    if($(this).scrollTop() > 100){
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

