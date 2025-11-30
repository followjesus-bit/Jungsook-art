let currentIndex = 0;
let currentLang = 'en';
let comments = {};
let imageNames = [];

fetch('comments.json')
  .then(r => r.json())
  .then(data => {
    comments = data;
    imageNames = Object.keys(comments).sort();
    console.log("Loaded imageNames:", imageNames); // ✅ Debug log
    updateImage();
  })
  .catch(err => console.error('Error loading captions:', err));

function updateImage() {
  const imageName = imageNames[currentIndex];
  const imgEl = document.getElementById("main-image");
  const pageEl = document.getElementById("page-number");
  const captionEl = document.getElementById("caption");

  imgEl.src = `images/${imageName}`;
  pageEl.textContent = `${currentIndex + 1} / ${imageNames.length}`;

  const comment = comments[imageName];
  if (comment && comment[currentLang]) {
    captionEl.innerHTML = comment[currentLang].map(line => `<div>${line}</div>`).join("");
  } else {
    captionEl.textContent = "";
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageNames.length;
  updateImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length;
  updateImage();
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ko' : 'en';
  document.getElementById('lang-toggle').textContent = currentLang === 'en' ? 'En' : '한글';
  updateImage();
}

// ✅ Additive interactions (safe and scoped)
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('main-image');
  if (!img) {
    console.error("main-image not found");
    return;
  }

  // Touch-to-move: tap left/right side of image
  img.addEventListener('click', (e) => {
    const midpoint = img.clientWidth / 2;
    if (e.offsetX < midpoint) {
      prevImage();
    } else {
      nextImage();
    }
  });

  // Swipe gesture
  let startX = 0;
  img.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  img.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if (Math.abs(dx) > 30) {
      if (dx < 0) nextImage();
      else prevImage();
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextImage();
    else if (e.key === 'ArrowLeft') prevImage();
    else if (e.key.toLowerCase() === 'l') toggleLang();
  });
});
