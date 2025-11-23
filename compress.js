const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // ✅ 올바른 방식

const inputDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'compressed');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .resize({ width: 1200 })
    .jpeg({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`✅ 압축 완료: ${file}`))
    .catch(err => console.error(`❌ 오류: ${file}`, err));
});
