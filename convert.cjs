const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'public/images/site-foto/arkadasini-getir.jpg';
const outputPath = 'public/images/site-foto/arkadasini-getir.webp';

sharp(inputPath)
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log('Image converted successfully: ', info);
  })
  .catch(err => {
    console.error('Error converting image: ', err);
  });
