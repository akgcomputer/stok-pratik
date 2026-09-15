const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-formu.astro', 'utf8');

text = text.replace(
  /whatsappBtn\.href = `https:\/\/wa\.me\/\$\{cleanPhone\}\?text=\$\{encodeURIComponent\(message\)\}`;/g,
  'whatsappBtn.href = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;'
);

fs.writeFileSync('src/pages/arkadasini-getir-formu.astro', text, 'utf8');
