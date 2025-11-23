const imageNames = [
  "0188.png", "0206.png", "0209.png", "jungsook.png", "5376.png"
];

const descriptions = {
  "0188.png": ["0188.png 작품 설명", "두 번째 줄 설명", "세 번째 줄 설명"],
  "0206.png": ["0206.png 작품 설명", "두 번째 줄 설명", "세 번째 줄 설명"],
  "0209.png": ["0209.png 작품 설명", "두 번째 줄 설명", "세 번째 줄 설명"],
  "jungsook.png": ["jungsook.png 작품 설명", "두 번째 줄 설명", "세 번째 줄 설명"],
  "5376.png": ["5376.png 작품 설명", "두 번째 줄 설명", "세 번째 줄 설명"]
};

let currentIndex = 0;

function updateImage() {
  const photo = document.getElementById("photo");
  const filename = imageNames[currentIndex];
  photo.src = "images/" + filename;

  const desc = descriptions[filename];
  document.getElementById("desc-line1").textContent = desc[0];
  document.getElementById("desc-line2").textContent = desc[1];
  document.getElementById("desc-line3").textContent = desc[2];
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length;
  updateImage();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageNames.length;
  updateImage();
}

// Initialize
updateImage();
