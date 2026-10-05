/* ==========================================================================
   HAIR ATELIER Gg - script.js

   このファイルでやっていること(2つだけ)
   1. スマホ用ハンバーガーメニューの開閉
   2. メニュー表のカテゴリ絞り込み(タブ切り替え)

   ※ JSが動かない環境でもサイトは全部読めるように作ってあります
     (ハンバーガーは使われず、メニューは全項目が表示されたままになる)
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. ハンバーガーメニュー
     ------------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('global-nav');

  if (toggle && nav) {
    var label = toggle.querySelector('.visually-hidden');

    // 開く/閉じるを切り替える関数
    function setNav(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'メニューを閉じる' : 'メニューを開く';
    }

    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // メニュー内のリンクを押したら閉じる(ページ内移動のため)
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    // Escキーで閉じる(閉じたあと、ボタンにフォーカスを戻す)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });

    // 画面を広げてPC幅になったら、開いた状態をリセットする
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ------------------------------------------------------------------
     2. メニューのカテゴリ絞り込み
     HTML側の data-filter(ボタン)と data-category(各メニュー項目)が
     一致するものだけを表示する。"all" のときは全部表示。
     ------------------------------------------------------------------ */
  var tabs = document.querySelectorAll('.menu-tab');
  var items = document.querySelectorAll('.menu-item');
  var groups = document.querySelectorAll('.menu-category');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = tab.getAttribute('data-filter');

      // ボタンの見た目と状態(aria-pressed)を更新
      tabs.forEach(function (t) {
        var isActive = (t === tab);
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-pressed', String(isActive));
      });

      // 項目の表示/非表示
      items.forEach(function (item) {
        var match = (filter === 'all') || (item.getAttribute('data-category') === filter);
        item.hidden = !match;
      });

      // 表示する項目が1つもないカテゴリ(見出しごと)は隠す
      groups.forEach(function (group) {
        group.hidden = !group.querySelector('.menu-item:not([hidden])');
      });
    });
  });
})();
