import fs from 'fs';

const files = ['src/pages/paketlerimiz.astro', 'src/pages/yeni-paketler.astro'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Ensure pricingData is imported
  if (!content.includes('import pricingData')) {
    content = content.replace('import BaseLayout', 'import pricingData from "../data/pricing-data.json";\nimport BaseLayout');
  }

  // Replace hardcoded prices with dynamic JSON logic
  // We'll replace the exact lines for the known packages:
  content = content.replace(/id:\s*"girisimci",\s*name:\s*"Girişimci Paket",\s*price:\s*"149"/g, 
    'id: "girisimci",\n    name: "Girişimci Paket",\n    price: pricingData.packages.find(p => p.id === "girisimci").rental_price');
    
  content = content.replace(/price:\s*"999"/g, 'price: pricingData.packages.find(p => p.id === "tek-magaza").rental_price');
  content = content.replace(/price:\s*"4\.999"/g, 'price: pricingData.packages.find(p => p.id === "tek-magaza").rental_price + pricingData.add_ons[0].rental_price');
  content = content.replace(/price:\s*"1\.999"/g, 'price: pricingData.packages.find(p => p.id === "eticaret-tek-magaza").rental_price');
  content = content.replace(/price:\s*"2\.499"/g, 'price: pricingData.packages.find(p => p.id === "oto-servis").rental_price');
  content = content.replace(/price:\s*"5\.999"/g, 'price: pricingData.packages.find(p => p.id === "crm-erp").rental_price');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
