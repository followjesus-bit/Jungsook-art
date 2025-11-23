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
  const filename = imageNames[currentIndex];
  document.getElementById("photo").src = "images/" + filename;

  const desc = descriptions[filename][currentLang];
  document.getElementById("desc-line1").textContent = desc[0];
  document.getElementById("desc-line2").textContent = desc[1];
  document.getElementById("desc-line3").textContent = desc[2];

  document.getElementById("page-number").textContent = `${currentIndex + 1} / ${imageNames.length}`;
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
  document.getElementById("lang-toggle").textContent = currentLang === "en" ? "En" : "한글";
  updateImage();
}

updateImage();
