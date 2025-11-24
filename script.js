const imageNames = Array.from({ length: 52 }, (_, i) => {
  const num = i + 1;
  return num < 10 ? `00${num}.png` : `0${num}.png`;
});

let currentIndex = 0;
let currentLang = "en";

const descriptions = {};
imageNames.forEach(name => {
  descriptions[name] = {
    ko: [`${name} 첫번째 설명`, "두 번째 설명", "세 번째 설명"],
    en: [`Description of ${name}`, "Second line", "Third line"]
  };
});

function updateImage() {
  const photoEl = document.getElementById("photo");
  const filename = imageNames[currentIndex];

  photoEl.style.opacity = 0;

  setTimeout(() => {
    photoEl.src = "images/" + filename;

    const desc = descriptions[filename][currentLang];
    document.getElementById("desc-line1").textContent = desc[0];
    document.getElementById("desc-line2").textContent = desc[1];
    document.getElementById("desc-line3").textContent = desc[2];

    document.getElementById("page-number").textContent =
      `${currentIndex + 1} / ${imageNames.length}`;

    photoEl.style.opacity = 1;
  }, 300);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length;
  updateImage();
}
function nextImage() {
  currentIndex = (currentIndex + 1) % imageNames.length;
  updateImage();
}
function toggleLang() {
  currentLang = currentLang === "en" ? "ko" : "en";
  document.getElementById("lang-toggle").textContent =
    currentLang === "en" ? "En" : "한글";
  updateImage();
}

function initImageGestures() {
  const photoEl = document.getElementById("photo");
  let touchStartX = null, touchStartY = null;

  photoEl.addEventListener("click", (e) => {
    const rect = photoEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prevImage();
    else nextImage();
  });

  photoEl.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  photoEl.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    if (touchStartX === null) return;
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dy) <= Math.abs(dx) * 0.5) {
      if (dx < 0) nextImage();
      else prevImage();
    }
    touchStartX = null; touchStartY = null;
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateImage();
  initImageGestures();
});
