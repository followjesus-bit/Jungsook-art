#!/bin/bash

set -euo pipefail

files=("032" "056" "057" "058")

for file in "${files[@]}"; do
  echo "🔧 Processing $file.png..."

  magick originals/$file.png -strip -colors 256 PNG8:images/${file}-8bit.png
  pngquant --quality=70-90 --ext .png --force images/${file}-8bit.png
  mv images/${file}-8bit.png images/${file}.png
  ls -lh images/${file}.png
done

echo "✅ All selected images compressed and verified."
