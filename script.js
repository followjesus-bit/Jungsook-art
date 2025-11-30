// Build photo array dynamically for 58 images
const photos = [];
for (let i = 1; i <= 58; i++) {
  const num = String(i).padStart(3, '0'); // 001, 002, ...
  photos.push({
    src: `images/${num}.jpg`,
    caption: `Caption for image ${num}`
  });
}

let currentIndex = 0;

function updateViewer() {
  const photo = photos[currentIndex];
  document.getElementById("photo").src = photo.src;
  document.getElementById("caption").innerText = photo.caption;
  document.getElementById("index").innerText = `${currentIndex + 1} / ${photos.length}`;
}

function prevPhoto() {
  if (currentIndex > 0) {
    currentIndex--;
    updateViewer();
  }
}

function nextPhoto() {
  if (currentIndex < photos.length - 1) {
    currentIndex++;
    updateViewer();
  }
}

updateViewer();
