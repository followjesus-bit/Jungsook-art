function updateImage() {
  const photoEl = document.getElementById("photo");
  const filename = imageNames[currentIndex];

  // Fade out
  photoEl.style.opacity = 0;

  setTimeout(() => {
    // Change image source
    photoEl.src = "images/" + filename;

    // Update captions
    const desc = descriptions[filename][currentLang];
    document.getElementById("desc-line1").textContent = desc[0];
    document.getElementById("desc-line2").textContent = desc[1];
    document.getElementById("desc-line3").textContent = desc[2];

    // Update page number
    document.getElementById("page-number").textContent =
      `${currentIndex + 1} / ${imageNames.length}`;

    // Fade back in
    photoEl.style.opacity = 1;
  }, 300); // wait half the transition time before swapping
}
