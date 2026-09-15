const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-formu.astro', 'utf8');

// 1. Simplify and fix the Radio Button section
const oldRadioSection = /\{\/\* Step 1: Radio Selection \*\/\}[\s\S]*?<hr class="border-slate-100" \/>/;

const newRadioSection = `{/* Step 1: Radio Selection */}
            <div class="flex flex-col sm:flex-row gap-4">
              <label class="flex-1 p-4 rounded-xl border-2 border-slate-200 bg-white cursor-pointer hover:bg-slate-50 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition-colors text-center">
                <input type="radio" name="userStatus" value="existing" checked class="sr-only" />
                <div>
                  <p class="text-slate-900 font-semibold text-sm md:text-base">Stok Pratik Kullanıcısıyım</p>
                  <p class="text-slate-500 text-xs mt-1">Davet ile 1 ay uzatmak istiyorum</p>
                </div>
              </label>

              <label class="flex-1 p-4 rounded-xl border-2 border-slate-200 bg-white cursor-pointer hover:bg-slate-50 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition-colors text-center">
                <input type="radio" name="userStatus" value="new" class="sr-only" />
                <div>
                  <p class="text-slate-900 font-semibold text-sm md:text-base">Yeni Geçeceğim</p>
                  <p class="text-slate-500 text-xs mt-1">1 ay hediye istiyorum</p>
                </div>
              </label>
            </div>
            
            <hr class="border-slate-100" />`;

text = text.replace(oldRadioSection, newRadioSection);

// Phone inputs
const oldPhone = /<input type="tel" id="userPhone".*?\/>/;
const newPhoneUser = `<input type="tel" id="userPhone" name="userPhone" required pattern="05[0-9]{9}" maxlength="11" minlength="11" placeholder="05XXXXXXXXX" class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors phone-input" />`;
text = text.replace(oldPhone, newPhoneUser);

const oldFriendPhone = /<input type="tel" id="friendPhone".*?\/>/;
const newPhoneFriend = `<input type="tel" id="friendPhone" name="friendPhone" required pattern="05[0-9]{9}" maxlength="11" minlength="11" placeholder="05XXXXXXXXX" class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors phone-input" />`;
text = text.replace(oldFriendPhone, newPhoneFriend);

// Add js logic for phone validation
const jsLogic = `
      // Phone Validation Logic (Starts with 05, max 11 digits, numbers only)
      const phoneInputs = document.querySelectorAll('.phone-input');
      phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
          let val = e.target.value.replace(/[^0-9]/g, ''); // only numbers
          if (val.length > 0 && val[0] !== '0') val = '0' + val;
          if (val.length > 1 && val[1] !== '5') val = '05' + val.substring(2);
          e.target.value = val;
        });
      });
`;
text = text.replace(`const resetBtn = document.getElementById('resetBtn');`, `const resetBtn = document.getElementById('resetBtn');\n` + jsLogic);

fs.writeFileSync('src/pages/arkadasini-getir-formu.astro', text, 'utf8');
