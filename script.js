const imageNames = Array.from({ length: 52 }, (_, i) => {
  const num = i + 1;
  return num < 10 ? `00${num}.png` : `0${num}.png`;
});

let currentIndex = 0;

function updateImage() {
  const filename = imageNames[currentIndex];
  const photo = document.getElementById("photo");
  photo.src = "images/" + filename;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length;
  updateImage();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageNames.length;
  updateImage();
}

updateImage();
