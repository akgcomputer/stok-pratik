const fs = require('fs');
let content = fs.readFileSync('src/react-components/Wizard.tsx', 'utf8');

// 1. Add states
content = content.replace(
  'const [analysisTextIndex, setAnalysisTextIndex] = useState(0);',
  'const [analysisTextIndex, setAnalysisTextIndex] = useState(0);\n  const [scannedBrands, setScannedBrands] = useState<string[]>([]);\n  const allBrands = [\'Logo Yazılım\', \'Mikro Yazılım\', \'Zirve Bilgisayar\', \'Luca\', \'Paraşüt\', \'Akınsoft\', \'DİA Yazılım\', \'ETA Bilgisayar\', \'Nebim\', \'Uyumsoft\', \'Bizim Hesap\', \'KolayBi\\\'\', \'Logo İşbaşı\', \'Vega Yazılım\', \'Orka Bilgisayar\', \'Datasoft\', \'Canias ERP\', \'Workcube ERP\', \'SAP Business One\', \'Microsoft Dynamics 365\', \'Oracle NetSuite\', \'Odoo ERP\', \'GMS.NET\', \'MikroX\', \'BizMu\', \'CPM Master ERP\', \'İnpos\', \'Bayt Yazılım\', \'Demsoft\', \'Sentez\', \'Vento\', \'Noyax\', \'Minerva\', \'IFS\', \'Fenesoft\', \'BilSoft\', \'Karel\', \'Aymet\', \'Prosoft\', \'CetaSoft\', \'Pikademi\', \'Axasoft\', \'Yaylasoft\', \'Netadam\', \'Atia\', \'Timecom\', \'Vera ERP\', \'Basecom\', \'Asyasoft\', \'Senkron ERP\'];'
);

// 2. Texts
const oldTexts = `  const analysisTexts = [
    \`İşletme modeliniz analiz ediliyor...\`,
    \`Sektörel parametreler (Perakende, E-Ticaret, Toptan) değerlendiriliyor...\`,
    \`Yapay Zeka, 60+ yazılım alternatifi arasından işletmenize en uygun olanı eşleştiriyor...\`
  ];`;
const newTexts = `  const analysisTexts = [
    \`İşletme modeliniz analiz ediliyor...\`,
    \`Nelere ihtiyacınız var kontrol ediyorum (Perakende, Mağaza POS, E-Ticaret, Entegrasyon, Pazaryeri, ERP, CRM)...\`,
    \`60+ marka arasında işletmenize en uygun çözümler taranıyor...\`,
    \`Fiyat/performans ve operasyonel uyuma göre en uygun 2 aday eşleştirildi!\`
  ];`;
content = content.replace(oldTexts, newTexts);

// 3. Logic
const oldStart = `  const startAnalysis = () => {
    setIsAnalyzing(true);
    setStep(4);
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < analysisTexts.length) {
        setAnalysisTextIndex(currentIdx);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep(5);
        }, 800);
      }
    }, 1200);
  };`;
const newStart = `  const startAnalysis = () => {
    setIsAnalyzing(true);
    setStep(4);
    setAnalysisTextIndex(0);
    setScannedBrands([]);
    let currentIdx = 0;
    
    const textInterval = setInterval(() => {
      currentIdx++;
      if (currentIdx < 4) { // new length is 4
        setAnalysisTextIndex(currentIdx);
      } else {
        clearInterval(textInterval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep(5);
        }, 1500);
      }
    }, 2000); // Slower text transition

    const brandInterval = setInterval(() => {
      if (currentIdx >= 2 && currentIdx < 3) {
        const randomBrands = [...allBrands].sort(() => 0.5 - Math.random()).slice(0, 3);
        setScannedBrands(randomBrands);
      } else if (currentIdx >= 3) {
        clearInterval(brandInterval);
      }
    }, 400); // Rapid brand flashing
  };`;
content = content.replace(oldStart, newStart);

// 4. Render
const oldRender = `        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-slate-100 rounded-full"></div>
              <div className="w-24 h-24 border-4 border-red-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
              <Loader2 className="w-8 h-8 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Pratik Yapay Zeka Devrede</h3>
            <p className="text-slate-500 font-medium animate-pulse text-center max-w-lg">{analysisTexts[analysisTextIndex]}</p>
          </div>
        )}`;
const newRender = `        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300 min-h-[400px]">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-slate-100 rounded-full"></div>
              <div className="w-24 h-24 border-4 border-red-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
              <Sparkles className="w-8 h-8 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Pratik Yapay Zeka Devrede</h3>
            <div className="h-12 flex items-center justify-center">
              <p className="text-slate-600 font-medium animate-pulse text-center max-w-lg">{analysisTexts[analysisTextIndex]}</p>
            </div>
            
            {analysisTextIndex >= 2 && analysisTextIndex < 3 && (
              <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-2xl min-h-[80px]">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md animate-pulse">Stok Pratik ERP</span>
                {scannedBrands.map((brand, i) => {
                  const colors = ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-purple-50 text-purple-700 border-purple-200'];
                  return <span key={i} className={\`border px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all \${colors[i % colors.length]}\`}>{brand}</span>;
                })}
              </div>
            )}
          </div>
        )}`;
content = content.replace(oldRender, newRender);

fs.writeFileSync('src/react-components/Wizard.tsx', content);
