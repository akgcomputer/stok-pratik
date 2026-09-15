const fs = require('fs');
let content = fs.readFileSync('src/react-components/Wizard.tsx', 'utf8');

// Update startAnalysis logic
const oldStart = `  const startAnalysis = () => {
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
const newStart = `  const startAnalysis = () => {
    setIsAnalyzing(true);
    setStep(4);
    setAnalysisTextIndex(0);
    setScannedBrands([]);
    let currentIdx = 0;
    
    let tick = 0;
    const textInterval = setInterval(() => {
      tick++;
      if (tick === 1) {
        currentIdx = 1;
        setAnalysisTextIndex(1);
      } else if (tick === 3) {
        currentIdx = 2;
        setAnalysisTextIndex(2);
      } else if (tick === 9) { // Much longer duration for the brands to appear (6 seconds)
        currentIdx = 3;
        setAnalysisTextIndex(3);
      } else if (tick === 11) {
        clearInterval(textInterval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep(5);
        }, 1000);
      }
    }, 1000); // 1s per tick

    const brandInterval = setInterval(() => {
      if (currentIdx === 2) {
        const pool = [...allBrands, 'Stok Pratik ERP', 'Stok Pratik ERP'];
        const randomBrands = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
        setScannedBrands(randomBrands);
      } else if (currentIdx >= 3) {
        clearInterval(brandInterval);
      }
    }, 800); // Slower brand flashing (800ms)
  };`;
content = content.replace(oldStart, newStart);


// Update step 4 render
const oldRender = `                  {idx === 2 && idx <= analysisTextIndex && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-start w-full transition-all duration-300">
                       <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">Stok Pratik ERP</span>
                       {idx === analysisTextIndex && scannedBrands.map((brand, bIdx) => {
                          const colors = ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-purple-50 text-purple-700 border-purple-200'];
                          return <span key={bIdx} className={\`border px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all \${colors[bIdx % colors.length]}\`}>{brand}</span>;
                       })}
                    </div>
                  )}`;
const newRender = `                  {idx === 2 && idx <= analysisTextIndex && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-start w-full transition-all duration-300">
                       {idx === analysisTextIndex && scannedBrands.map((brand, bIdx) => {
                          if (brand === 'Stok Pratik ERP') {
                            return <span key={bIdx} className="bg-red-600 text-white border border-red-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">Stok Pratik ERP</span>;
                          }
                          const colors = ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-purple-50 text-purple-700 border-purple-200'];
                          return <span key={bIdx} className={\`border px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all \${colors[bIdx % colors.length]}\`}>{brand}</span>;
                       })}
                    </div>
                  )}`;
content = content.replace(oldRender, newRender);

fs.writeFileSync('src/react-components/Wizard.tsx', content);
