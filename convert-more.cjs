const sharp = require('sharp');
const fs = require('fs');

const images = ['arkadasini-getir-2', 'arkadasini-getir-3'];

Promise.all(images.map(img => {
  const inputPath = `public/images/site-foto/${img}.jpg`;
  const outputPath = `public/images/site-foto/${img}.webp`;
  
  if (fs.existsSync(inputPath)) {
    return sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(info => {
        console.log(`Image ${img} converted successfully: `, info);
      })
      .catch(err => {
        console.error(`Error converting ${img}: `, err);
      });
  } else {
    console.log(`File not found: ${inputPath}`);
    return Promise.resolve();
  }
})).then(() => {
  console.log('Done');
});
