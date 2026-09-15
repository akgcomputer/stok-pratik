const fs = require('fs');
let text = fs.readFileSync('src/react-components/Wizard.tsx', 'utf8');

const bad = `<button className="w-full py-4 px-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-lg">
                    15 Dk Hızlı Demo Al & Başla <ArrowRight className="w-5 h-5" />
                  </button>`;

const good = `<a href="https://wa.me/905325000999?text=Merhaba,%20Stok%20Pratik%20hakkında%20demo%20istiyorum." target="_blank" rel="noopener noreferrer" className="w-full py-4 px-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-lg">
                    15 Dk Hızlı Demoyu Başlat <ArrowRight className="w-5 h-5" />
                  </a>`;

if(text.includes(bad)) {
  text = text.replace(bad, good);
  fs.writeFileSync('src/react-components/Wizard.tsx', text, 'utf8');
  console.log('Successfully updated the demo button');
} else {
  console.log('Could not find the button to replace');
}
