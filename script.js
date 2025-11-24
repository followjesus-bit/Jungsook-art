const images = [];
for (let i = 1; i <= 52; i++) {
  images.push(String(i).padStart(3, '0') + '.png');
}

let currentIndex = 0;
let comments = {};
let currentLang = 'ko';

const imageElement = document.getElementById('photo');
const captionElements = [
  document.getElementById('caption1'),
  document.getElementById('caption2'),
  document.getElementById('caption3')
];

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const langButton = document.getElementById('lang');
const counterElement = document.getElementById('counter');

function updateViewer() {
  const fileName = images[currentIndex];
  imageElement.src = 'images/' + fileName;
  counterElement.textContent = `${currentIndex + 1} / ${images.length}`;

  const desc = comments[fileName]?.