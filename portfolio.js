/* ===============================
   ハンバーガーメニュー
=============================== */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.querySelector(".menu_list");
  const menuLinks = document.querySelectorAll(".menu_list a");

  if (!hamburger || !menu) {
    console.log("hamburger or menu not found");
    return;
  }

  // ハンバーガークリックで開閉
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // メニュー内リンクをクリックしたら閉じる
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
});



/* ===============================
   ポップアップ（characteristics）
=============================== */
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const overlay = document.getElementById("popupOverlay");

  if(openBtn && closeBtn && overlay) {
    // 開く
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      overlay.style.display = "flex";
    });

    // 閉じる（×）
    closeBtn.addEventListener("click", function () {
      overlay.style.display = "none";
    });

    // 背景クリックで閉じる
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.style.display = "none";
    });
  }
});

/* ===============================
   Creation用ポップアップ
=============================== */
document.addEventListener("DOMContentLoaded", function () {
  const creationOverlay = document.getElementById("creationPopupOverlay");
  const creationClose = document.getElementById("creationClosePopup");
  const popupImage = document.querySelector(".creation_popup_image");
  const popupText = document.querySelector(".creation_popup_text");
  const popupLink = document.querySelector(".creation_popup_link");

  if (creationOverlay && creationClose && popupImage) {
    // 画像だけでなくタイトルもクリック対象に
    document.querySelectorAll(".creation_popup_trigger, .work_title").forEach(elem => {
      elem.addEventListener("click", function () {
        // クリックされた要素がwork_titleなら親の画像からデータを取得
        let imgElem = elem.classList.contains("work_title") ? elem.closest(".creation_item").querySelector(".creation_popup_trigger") : elem;
        const { title, intent, tools, link } = imgElem.dataset;

        popupImage.src = imgElem.src;
        popupText.innerHTML = `
          <p><strong>タイトル：</strong>${title}</p>
          <p><strong>制作意図：</strong>${intent}</p>
          <p><strong>使用ツール：</strong>${tools}</p>
        `;
        popupLink.href = link;

        creationOverlay.style.display = "flex";
      });
    });

    creationClose.addEventListener("click", () => creationOverlay.style.display = "none");
    creationOverlay.addEventListener("click", e => {
      if (e.target === creationOverlay) creationOverlay.style.display = "none";
    });
  }
});


// Safari判定
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Safari用：超ゆっくりスクロール
function smoothScrollSafari(targetY) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 1200; // ← ゆっくり度（大きいほど遅い）
  let startTime = null;

  function step(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);

    // なめらかイージング
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/* ===============================
   メニュークリックでスムーズスクロール
=============================== */
document.querySelectorAll('.menu_list a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    // セクション内のタイトルを基準にする
    const title = target.querySelector(
      '.profile_title, .skill_licensee_title, .characteristics_title, .support_title, .creation_title, .vision_title'
    ) || target;

    // ヘッダー高さ（あれば）
// ヘッダー高さ
const header = document.querySelector('header');
let offset = header ? header.offsetHeight : 0;

// ===== 画面幅ごとのスクロール調整 =====
if (window.matchMedia('(max-width: 480px)').matches) {
  // スマホ
  offset += -100;

} else if (window.matchMedia('(max-width: 900px)').matches) {
  // タブレット縦
  offset += -200;

} else if (window.matchMedia('(max-width: 1024px)').matches) {
  // タブレット横
  offset += -300;

} else if (window.matchMedia('(max-width: 1280px)').matches) {
  // ノートPC（Windows多め）
  offset += -400;

}  
else if (window.matchMedia('(max-width: 1366px)').matches) {
  // ノートPC（Windows多め）
  offset += -480;

} else if (window.matchMedia('(max-width: 1400px)').matches) {
  // ⭐ MacBook Pro（14 / 16インチ Retina）
  offset += -500;

}  else {
  // iMac / デスクトップ / Mac Pro
  offset += -700;
}

    const y =
      title.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

if (isSafari) {
  smoothScrollSafari(y);
} else {
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}

  });
});



// トップに戻るボタン
const backToTop = document.getElementById("backToTop");
const topSection = document.getElementById("top");

// スクロールでボタン表示
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {  // 100px以上スクロールしたら表示
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

// クリックで #top セクションまでスクロール
backToTop.addEventListener("click", () => {
  if (isSafari) {
    smoothScrollSafari(0);
  } else {
    topSection.scrollIntoView({ behavior: "smooth" });
  }
});



  //document.addEventListener("DOMContentLoaded", function() {
    // 画面幅が768px以下（スマホ想定）の場合
   // if (window.innerWidth <= 768) {
   //   alert("このサイトはPCでの閲覧を推奨しています。");
   // }
  //});


  window.addEventListener("load", () => {
  const isPC = window.innerWidth >= 1024;

  if (isPC) {
    alert("このサイトはPCでの閲覧を推奨しています");
  }
});



/* ===============================
   スクロールアニメーション
=============================== */
const targets = document.querySelectorAll('.fade');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

targets.forEach(target => observer.observe(target));


/* ===============================
   ローディングアニメーション
=============================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const title = document.querySelector(".top_title");

  console.log(title); // ← デバッグ（確認用）

  setTimeout(() => {
    if (loader) {
      loader.classList.add("fade-out");
    }

    setTimeout(() => {
      if (loader) {
        loader.style.display = "none";
      }

      // ここでタイトル表示＆アニメーション発火🔥
      if (title) {
        title.classList.add("show");
      }

    }, 800);
  }, 800);
});



const strawberry = document.querySelector(".top_strawberry");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // 奥行きだけ（超自然）
  const scale = 1 + scrollY * 0.0004;

  if (strawberry) {
    strawberry.style.transform =
      `translate(-50%, -50%) scale(${scale})`;
  }
});