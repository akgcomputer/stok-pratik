const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/pazaryeri-ihracat.astro');
let content = fs.readFileSync(filePath, 'utf8');

// The multi-select element from the previous code:
// <select id="waExportCountries" multiple style="height: 180px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.5rem;">

const oldSelectRegex = /<select id="waExportCountries" multiple[\s\S]*?<\/select>/;

let newSelectHTML = `<select id="waExportCountriesSelect" style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; width: 100%;">
                    <option value="">Ülke Eklemek İçin Tıklayın (En fazla 5)</option>
                    <optgroup label="Öne Çıkan Ülkeler">
                        <option value="Türkiye">Türkiye</option>
                        <option value="İspanya">İspanya</option>
                        <option value="İngiltere">İngiltere</option>
                        <option value="Almanya">Almanya</option>
                        <option value="İtalya">İtalya</option>
                        <option value="Fransa">Fransa</option>
                        <option value="Amerika Birleşik Devletleri">Amerika Birleşik Devletleri</option>
                        <option value="Çin">Çin</option>
                        <option value="Kanada">Kanada</option>
                        <option value="Meksika">Meksika</option>
                        <option value="Endonezya">Endonezya</option>
                        <option value="Malezya">Malezya</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Japonya">Japonya</option>
                        <option value="Hindistan">Hindistan</option>
                        <option value="Güney Kore">Güney Kore</option>
                    </optgroup>
                    <optgroup label="Avrupa Kıtası">
                        <option value="Andorra">Andorra</option>
                        <option value="Arnavutluk">Arnavutluk</option>
                        <option value="Avusturya">Avusturya</option>
                        <option value="Belçika">Belçika</option>
                        <option value="Bosna-Hersek">Bosna-Hersek</option>
                        <option value="Bulgaristan">Bulgaristan</option>
                        <option value="Çekya">Çekya</option>
                        <option value="Danimarka">Danimarka</option>
                        <option value="Estonya">Estonya</option>
                        <option value="Finlandiya">Finlandiya</option>
                        <option value="Hırvatistan">Hırvatistan</option>
                        <option value="Hollanda">Hollanda</option>
                        <option value="İrlanda">İrlanda</option>
                        <option value="İsveç">İsveç</option>
                        <option value="İsviçre">İsviçre</option>
                        <option value="İzlanda">İzlanda</option>
                        <option value="Karadağ">Karadağ</option>
                        <option value="Kosova">Kosova</option>
                        <option value="Letonya">Letonya</option>
                        <option value="Lihtenştayn">Lihtenştayn</option>
                        <option value="Litvanya">Litvanya</option>
                        <option value="Lüksemburg">Lüksemburg</option>
                        <option value="Macaristan">Macaristan</option>
                        <option value="Kuzey Makedonya">Kuzey Makedonya</option>
                        <option value="Malta">Malta</option>
                        <option value="Monako">Monako</option>
                        <option value="Norveç">Norveç</option>
                        <option value="Polonya">Polonya</option>
                        <option value="Portekiz">Portekiz</option>
                        <option value="Romanya">Romanya</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sırbistan">Sırbistan</option>
                        <option value="Slovakya">Slovakya</option>
                        <option value="Slovenya">Slovenya</option>
                        <option value="Yunanistan">Yunanistan</option>
                    </optgroup>
                    <optgroup label="Ortadoğu">
                        <option value="Birleşik Arap Emirlikleri">Birleşik Arap Emirlikleri</option>
                        <option value="Bahreyn">Bahreyn</option>
                        <option value="Filistin">Filistin</option>
                        <option value="Irak">Irak</option>
                        <option value="İran">İran</option>
                        <option value="Katar">Katar</option>
                        <option value="Kuveyt">Kuveyt</option>
                        <option value="Lübnan">Lübnan</option>
                        <option value="Mısır">Mısır</option>
                        <option value="Umman">Umman</option>
                        <option value="Suudi Arabistan">Suudi Arabistan</option>
                        <option value="Suriye">Suriye</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Ürdün">Ürdün</option>
                    </optgroup>
                    <optgroup label="Avrasya / BDT">
                        <option value="Rusya">Rusya</option>
                        <option value="Azerbaycan">Azerbaycan</option>
                        <option value="Ermenistan">Ermenistan</option>
                        <option value="Gürcistan">Gürcistan</option>
                        <option value="Kazakistan">Kazakistan</option>
                        <option value="Kırgızistan">Kırgızistan</option>
                        <option value="Tacikistan">Tacikistan</option>
                        <option value="Türkmenistan">Türkmenistan</option>
                        <option value="Özbekistan">Özbekistan</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Ukrayna">Ukrayna</option>
                    </optgroup>
                    <optgroup label="Afrika Kıtası">
                        <option value="Angola">Angola</option>
                        <option value="Benin">Benin</option>
                        <option value="Botsvana">Botsvana</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cezayir">Cezayir</option>
                        <option value="Cibuti">Cibuti</option>
                        <option value="Çad">Çad</option>
                        <option value="Ekvator Ginesi">Ekvator Ginesi</option>
                        <option value="Eritre">Eritre</option>
                        <option value="Esvatini">Esvatini</option>
                        <option value="Etiyopya">Etiyopya</option>
                        <option value="Fas">Fas</option>
                        <option value="Fildişi Sahili">Fildişi Sahili</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambiya">Gambiya</option>
                        <option value="Gana">Gana</option>
                        <option value="Gine">Gine</option>
                        <option value="Gine-Bissau">Gine-Bissau</option>
                        <option value="Güney Afrika Cumhuriyeti">Güney Afrika Cumhuriyeti</option>
                        <option value="Güney Sudan">Güney Sudan</option>
                        <option value="Kamerun">Kamerun</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Komorlar">Komorlar</option>
                        <option value="Kongo Cumhuriyeti">Kongo Cumhuriyeti</option>
                        <option value="Demokratik Kongo Cumhuriyeti">Demokratik Kongo Cumhuriyeti</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberya">Liberya</option>
                        <option value="Libya">Libya</option>
                        <option value="Madagaskar">Madagaskar</option>
                        <option value="Malavi">Malavi</option>
                        <option value="Mali">Mali</option>
                        <option value="Moritanya">Moritanya</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mozambik">Mozambik</option>
                        <option value="Namibya">Namibya</option>
                        <option value="Nijer">Nijer</option>
                        <option value="Nijerya">Nijerya</option>
                        <option value="Orta Afrika Cumhuriyeti">Orta Afrika Cumhuriyeti</option>
                        <option value="Ruanda">Ruanda</option>
                        <option value="Sao Tome ve Principe">Sao Tome ve Principe</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seyşeller">Seyşeller</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Somali">Somali</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Tanzanya">Tanzanya</option>
                        <option value="Togo">Togo</option>
                        <option value="Tunus">Tunus</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Yeşil Burun">Yeşil Burun</option>
                        <option value="Zambiya">Zambiya</option>
                        <option value="Zimbabve">Zimbabve</option>
                    </optgroup>
                    <optgroup label="Asya / Pasifik">
                        <option value="Afganistan">Afganistan</option>
                        <option value="Bangladeş">Bangladeş</option>
                        <option value="Filipinler">Filipinler</option>
                        <option value="Kuzey Kore">Kuzey Kore</option>
                        <option value="Kamboçya">Kamboçya</option>
                        <option value="Laos">Laos</option>
                        <option value="Maldivler">Maldivler</option>
                        <option value="Moğolistan">Moğolistan</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Singapur">Singapur</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Tayland">Tayland</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Yeni Zelanda">Yeni Zelanda</option>
                        <option value="Avustralya">Avustralya</option>
                    </optgroup>
                    <optgroup label="Güney Amerika">
                        <option value="Arjantin">Arjantin</option>
                        <option value="Bolivya">Bolivya</option>
                        <option value="Brezilya">Brezilya</option>
                        <option value="Ekvador">Ekvador</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Kolombiya">Kolombiya</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Surinam">Surinam</option>
                        <option value="Şili">Şili</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Venezuela">Venezuela</option>
                    </optgroup>
                </select>
                <div id="selectedCountriesContainer" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;"></div>`;

content = content.replace(oldSelectRegex, newSelectHTML);

// Replace JS logic
const oldJSRegex = /<script>[\s\S]*?<\/script>/;
const newJSContent = `<script>
            let selectedCountriesList = [];
            const maxCountries = 5;

            document.getElementById('waExportCountriesSelect').addEventListener('change', function() {
                const val = this.value;
                if (val && !selectedCountriesList.includes(val)) {
                    if (selectedCountriesList.length >= maxCountries) {
                        alert("En fazla 5 ülke seçebilirsiniz.");
                        this.value = "";
                        return;
                    }
                    selectedCountriesList.push(val);
                    renderCountries();
                }
                this.value = ""; // Reset after selection
            });

            function renderCountries() {
                const container = document.getElementById('selectedCountriesContainer');
                container.innerHTML = "";
                selectedCountriesList.forEach((country, index) => {
                    const badge = document.createElement('span');
                    badge.style.cssText = "background: #e2e8f0; color: #1e293b; padding: 0.35rem 0.6rem; border-radius: 0.5rem; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 500;";
                    badge.innerHTML = \`\${country} <span style="cursor:pointer; color: #ef4444; font-weight: bold; font-size: 1.1rem; line-height: 1;" onclick="removeCountry(\${index})">×</span>\`;
                    container.appendChild(badge);
                });
            }

            window.removeCountry = function(index) {
                selectedCountriesList.splice(index, 1);
                renderCountries();
            }

            document.getElementById('whatsappForm').addEventListener('submit', function(e) {
              e.preventDefault();
              const name = document.getElementById('waName').value;
              const email = document.getElementById('waEmail').value;
              const phone = document.getElementById('waPhone').value;
              const company = document.getElementById('waCompany').value;
              const type = document.getElementById('waType').value;
              const sector = document.getElementById('waSector').value;
              const isExporting = document.getElementById('waExport').value;
              
              let exportText = isExporting;
              if (isExporting === 'Evet') {
                  if(selectedCountriesList.length > 0) {
                      exportText += " (" + selectedCountriesList.join(', ') + ")";
                  } else {
                      exportText += " (Ülke seçilmedi)";
                  }
              }
              
              const message = \`Merhaba, Pazaryeri ve İhracat çözümleriniz için başvuru yapmak istiyorum.\\n\\n*Ad Soyad:* \${name}\\n*E-posta:* \${email}\\n*Telefon:* \${phone}\\n*İşletme Adı:* \${company}\\n*İşletme Türü:* \${type}\\n*Sektör:* \${sector}\\n*İhracat:* \${exportText}\`;
              
              const whatsappUrl = \`https://wa.me/905325000999?text=\${encodeURIComponent(message)}\`;
              window.open(whatsappUrl, '_blank');
            });
          </script>`;

content = content.replace(oldJSRegex, newJSContent);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete.');
