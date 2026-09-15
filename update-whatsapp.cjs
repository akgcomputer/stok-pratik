const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-formu.astro', 'utf8');

const oldSubmitLogic = /form\.addEventListener\('submit', \(e\) => \{[\s\S]*?\/\/ Toggle view\n\s*formContainer\.classList\.add\('hidden'\);\n\s*successContainer\.classList\.remove\('hidden'\);\n\s*\}\);/;

const newSubmitLogic = `form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const friendName = document.getElementById('friendName').value.trim();
        const friendPhone = document.getElementById('friendPhone').value.trim();
        const code = createCode(userName);
        
        // Set code UI
        generatedCodeEl.textContent = code;
        
        // Format phone for WhatsApp (Turkey: 905...)
        let cleanPhone = friendPhone.replace(/[^0-9]/g, '');
        if (cleanPhone.startsWith('0')) {
          cleanPhone = '90' + cleanPhone.substring(1);
        } else if (!cleanPhone.startsWith('90')) {
          cleanPhone = '90' + cleanPhone;
        }
        
        // Prepare WhatsApp Link
        const message = \`Merhaba \${friendName} 👋\\n\\nSenin *1 ay ücretsiz kullanman* için Stok Pratik davet kodu iletti (davet kodu: \${code} 🎁) bu kod ile sisteme giriş yapıp hemen ücretsiz kullanmaya başlayabilirsin. Dilersen sen de arkadaşın \${userName} gibi davet kodu arkadaşına ileterek ücretsiz kullanabilirsin. 🚀\\n\\nKayıt adresi: https://stokpratik.com.tr/firma-kaydi\\nSeni de aramızda görmek isteriz.. 😊\`;
        
        // Open directly with the friend's number
        whatsappBtn.href = \`https://wa.me/\${cleanPhone}?text=\${encodeURIComponent(message)}\`;
        
        // Toggle view
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
      });`;

text = text.replace(oldSubmitLogic, newSubmitLogic);
fs.writeFileSync('src/pages/arkadasini-getir-formu.astro', text, 'utf8');
