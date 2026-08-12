const fs = require('fs');
const file = 'src/components/PricingWizard.jsx';
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync(file, c);
console.log('Fixed PricingWizard.jsx');
