const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'content', 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const titles = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = content.match(/^title:\s*(?:['"](.*?)['"]|(.*?))$/m);
  if (match) {
    const raw = match[1] || match[2] || file;
    titles.push(raw.trim());
  } else {
    titles.push(file);
  }
}

titles.sort((a, b) => a.localeCompare(b, 'tr'));

const output = titles.map((t, i) => `${i + 1}. ${t}`).join('\n');
fs.writeFileSync('mevcut-blog-basliklari.txt', output, 'utf8');
console.log(`TOTAL_TITLES:${titles.length}`);
