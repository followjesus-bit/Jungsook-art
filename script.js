let currentIndex = 0;
let currentLang = 'en';
let comments = {};
let imageNames = [];

// Load captions from comments.json
fetch('comments.json')
  .then(response => response.json())
  .then(data => {
    comments = data;
    imageNames = Object.keys(comments).sort();
    updateImage();
  })
  .catch(error => console.error("Error loading captions:", error));

function updateImage() {
  const imageName = imageNames[currentIndex];
  document.getElementById("main-image").src = `images/${imageName}`;
  document.getElementById("page-number").textContent = `${currentIndex + 1} / ${imageNames.length}`;

  const comment = comments[imageName];
  if (comment) {
    // Render each caption line separately
    document.getElementById("caption").innerHTML = comment[currentLang]
      .map(line => `<div>${line}</div>`)
      .join("");
  } else {
    document.getElementById("caption").textContent = "";
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

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'ArrowLeft') {
    prevImage();
  } else if (event.key.toLowerCase() === 'l') {
    toggleLang();
  }
});
