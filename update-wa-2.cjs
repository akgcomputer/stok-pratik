const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-formu.astro', 'utf8');

const newScript = `<script>
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('inviteForm');
      const formContainer = document.getElementById('formContainer');
      const successContainer = document.getElementById('successContainer');
      const generatedCodeEl = document.getElementById('generatedCode');
      const copyBtn = document.getElementById('copyBtn');
      const whatsappBtn = document.getElementById('whatsappBtn');
      const resetBtn = document.getElementById('resetBtn');

      // Phone Validation Logic
      const phoneInputs = document.querySelectorAll('.phone-input');
      phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
          let val = e.target.value.replace(/[^0-9]/g, '');
          if (val.length > 0 && val[0] !== '0') val = '0' + val;
          if (val.length > 1 && val[1] !== '5') val = '05' + val.substring(2);
          e.target.value = val;
        });
      });

      function createCode(fullName) {
        const charMap = { 'ç':'c', 'Ç':'C', 'ğ':'g', 'Ğ':'G', 'ı':'i', 'I':'I', 'İ':'I', 'ö':'o', 'Ö':'O', 'ş':'s', 'Ş':'S', 'ü':'u', 'Ü':'U' };
        let cleaned = fullName.replace(/[çÇğĞıIİöÖşŞüÜ]/g, match => charMap[match] || match);
        cleaned = cleaned.replace(/[^a-zA-Z\\s]/g, '').trim();
        const parts = cleaned.split(' ').filter(Boolean);
        if (parts.length === 0) return 'STOK-1AY';
        let lastName = parts.length > 1 ? parts.pop() : parts[0];
        let firstInitial = parts.length > 0 ? parts[0].charAt(0) : '';
        return \`\${lastName}\${firstInitial}-1AY\`.toUpperCase();
      }

      function toTitleCase(str) {
        return str.toLocaleLowerCase('tr-TR').split(' ').map(word => {
          if(!word) return '';
          return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
        }).join(' ');
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userNameRaw = document.getElementById('userName').value.trim();
        const friendNameRaw = document.getElementById('friendName').value.trim();
        const friendPhone = document.getElementById('friendPhone').value.trim();
        
        const userName = toTitleCase(userNameRaw);
        const friendName = toTitleCase(friendNameRaw);
        const code = createCode(userNameRaw);
        
        generatedCodeEl.textContent = code;
        
        let cleanPhone = friendPhone.replace(/[^0-9]/g, '');
        if (cleanPhone.startsWith('0')) {
          cleanPhone = '90' + cleanPhone.substring(1);
        } else if (!cleanPhone.startsWith('90')) {
          cleanPhone = '90' + cleanPhone;
        }
        
        const message = \`Merhaba \${friendName} 👋\\n\\n*1 ay ücretsiz kullanman* 🎁 için Stok Pratik davet kodu üretildi (Davet kodu: \${code} ) bu kod ile sisteme giriş yapıp hemen ücretsiz kullanmaya başlayabilirsin. Dilersen sen de arkadaşın \${userName} gibi davet kodu arkadaşına ileterek ücretsiz kullanabilirsin. 🚀\\n\\nKayıt adresi: https://stokpratik.com.tr/firma-kaydi\\nSeni de aramızda görmek isteriz.. 😊\`;
        
        const encodedMsg = encodeURIComponent(message);
        
        whatsappBtn.href = \`whatsapp://send?phone=\${cleanPhone}&text=\${encodedMsg}\`;
        
        // Custom click handler to ensure WhatsApp opens properly on all devices
        whatsappBtn.onclick = function(e) {
            e.preventDefault();
            // Open standard API link in new tab
            window.open(\`https://api.whatsapp.com/send?phone=\${cleanPhone}&text=\${encodedMsg}\`, '_blank');
            
            // Attempt to trigger native protocol as fallback/primary depending on OS
            setTimeout(() => {
              window.location.href = \`whatsapp://send?phone=\${cleanPhone}&text=\${encodedMsg}\`;
            }, 500);
        };
        
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
      });

      copyBtn.addEventListener('click', () => {
        const code = generatedCodeEl.textContent;
        navigator.clipboard.writeText(code).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = \`<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Kopyalandı!\`;
          setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
        });
      });

      resetBtn.addEventListener('click', () => {
        form.reset();
        successContainer.classList.add('hidden');
        formContainer.classList.remove('hidden');
      });
    });
  </script>`;

const scriptRegex = /<script>[\s\S]*?<\/script>/;
text = text.replace(scriptRegex, newScript);

fs.writeFileSync('src/pages/arkadasini-getir-formu.astro', text, 'utf8');
