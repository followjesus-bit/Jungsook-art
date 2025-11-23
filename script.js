const imageNames = Array.from({ length: 52 }, (_, i) => {
  const num = i + 1;
  return num < 10 ? `00${num}.png` : `0${num}.png`;
};

const descriptions = {};
imageNames.forEach(name => {
  descriptions[name] = {
    ko: [`${name} 작품 설명`, "두 번째 줄 설명", "세 번째 줄 설명"],
    en: [`Description of ${name}`, "Second line", "Third line"]
  };
});

let currentIndex = 0;
let currentLang = "ko";

function updateImage() {
  const filename = imageNames[currentIndex];
  const photo = document.getElementById("photo");
  photo.src = "images/" + filename;

  const desc = descriptions[filename][currentLang];
  document.getElementById("desc-line1").textContent = desc[0];
  document.getElementById("desc-line2").textContent = desc[1];
  document.getElementById("desc-line3").textContent = desc[2];

  document.getElementById("page-info").textContent =
    `${currentIndex + 1} / ${imageNames.length} — ${filename}`;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length;
  updateImage();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageNames.length;
  updateImage();
}

function setLang(lang) {
  currentLang = lang;
  updateImage();
}

updateImage();
