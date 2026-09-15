const fs = require('fs');
let text = fs.readFileSync('src/react-components/Wizard.tsx', 'utf8');

const badString = `                  </a>
                </div>
              </div>
            </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center max-w-3xl mx-auto">`;

const goodString = `                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center max-w-3xl mx-auto">`;

text = text.replace(badString, goodString);

// robust fallback if it didn't match perfectly
text = text.replace(/(\s*<\/div>){2,5}\s*<div className="bg-slate-50 border border-slate-200/g, '\n            </div>\n\n            <div className="bg-slate-50 border border-slate-200');


fs.writeFileSync('src/react-components/Wizard.tsx', text, 'utf8');
console.log('Fixed extra divs');
