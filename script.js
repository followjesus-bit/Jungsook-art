// Build list of image filenames 001.png ... 052.png
const imageNames = Array.from({ length: 52 }, (_, i) => {
  const num = i + 1;
  return num < 10 ? `00${num}.png` : `0${num}.png`;
});

let currentIndex = 0;
let currentLang = "en";

// Caption templates (replace with real content as needed)
const descriptions = {};
imageNames.forEach(name => {
  descriptions[name] = {
    ko: [`${name} 첫번째 설명`, "두 번째 설명", "세 번째 설명"],
    en: [`Description of ${name}`, "Second line", "Third line"]
  };
});

function updateImage() {
  const filename = imageNames[currentIndex];
  const photoEl = document.getElementById("photo");
  const pageEl = document.getElementById("page-number");

  // Update image src
  photoEl.src = "images/" + filename;

  // Update captions
  const desc = descriptions[filename][currentLang];
  document.getElementById("desc-line1").textContent = desc[0];
  document.getElementById("desc-line2").textContent = desc[1];
  document.getElementById("desc-line3").textContent = desc[2];

  // Update page number (ensure element exists)
  if (pageEl) {
    pageEl.textContent = `${currentIndex + 1} / ${imageNames.length}`;
  }
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

// Tap and swipe to navigate on the image area
function initImageGestures() {
  const photoEl = document.getElementById("photo");
  let touchStartX = null;
  let touchStartY = null;

  // Tap: left half -> prev, right half -> next
  photoEl.addEventListener("click", (e) => {
    const rect = photoEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prevImage();
    else nextImage();
  });

  // Swipe detection
  photoEl.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  photoEl.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    if (touchStartX === null || touchStartY === null) return;

    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    const minSwipe = 50;      // horizontal threshold
    const maxAngle = 0.5;     // prefer horizontal swipes (|dy/dx| <= 0.5)

    if (Math.abs(dx) > minSwipe && Math.abs(dy) <= Math.abs(dx) * maxAngle) {
      if (dx < 0) nextImage(); // swipe left -> next
      else prevImage();        // swipe right -> prev
    }

    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  // Optional keyboard navigation (desktop)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
}

// Initialize after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  updateImage();
  initImageGestures();
});
