const fs = require('fs');
const path = require('path');

const directoryPath = 'src/pages';
const files = fs.readdirSync(directoryPath).filter(file => file.startsWith('destek-') && file.endsWith('.astro'));

const newBreadcrumb = `<nav class="text-sm font-medium text-slate-500 mb-6 flex items-center gap-2">
        <a href="/" class="hover:text-red-600 transition-colors">Ana Sayfa</a> 
        <span>/</span> 
        <a href="/destek-icerikleri" class="text-slate-800 hover:text-red-600 transition-colors">Destek İçerikleri</a>
      </nav>`;

const navRegex = /<nav class="text-sm font-medium text-slate-500 mb-6 flex items-center gap-2">[\s\S]*?<\/nav>/;

files.forEach(file => {
  const filePath = path.join(directoryPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (navRegex.test(content)) {
    content = content.replace(navRegex, newBreadcrumb);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + file);
  }
});
