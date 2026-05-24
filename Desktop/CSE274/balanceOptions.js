import fs from 'fs';

// Read data.js as text to extract LONG_QA
const dataJs = fs.readFileSync('src/data.js', 'utf8');
const longQaMatch = dataJs.match(/export const LONG_QA = (\[[\s\S]*\])/);
const longQaStr = longQaMatch ? longQaMatch[1] : '[]';

import('./src/data.js').then(m => {
  const MCQ = m.MCQ;
  let changedOptions = 0;

  for (let u in MCQ) {
    MCQ[u].forEach(q => {
      q.opts = q.opts.map((opt, idx) => {
        let cleaned = opt;
        
        // 1. Remove text after em-dash
        if (cleaned.includes(' — ')) {
          cleaned = cleaned.split(' — ')[0].trim();
        }
        
        // 2. Remove text after " - " if it looks like an explanation (has multiple words)
        // This preserves "Q1 - 1.5*IQR" but removes " - and this is a good model"
        if (cleaned.includes(' - ')) {
          const parts = cleaned.split(' - ');
          // if the part after the dash has > 2 words, it's an explanation
          if (parts[1] && parts[1].trim().split(' ').length > 2) {
            cleaned = parts[0].trim();
          }
        }
        
        // 3. Remove text after ":" if it looks like an explanation
        // e.g. "Temporal leakage: using future data"
        if (cleaned.includes(': ')) {
           const parts = cleaned.split(': ');
           if (parts[1] && parts[1].trim().split(' ').length > 2) {
             cleaned = parts[0].trim();
           }
        }
        
        // 4. Remove parenthetical explanations, but keep math.
        // e.g. remove "(Multiple Imputation by Chained Equations)"
        // keep "(Q3 - Q1)"
        cleaned = cleaned.replace(/\s*\((.*?)\)/g, (match, inner) => {
          // If inner text has > 2 words and doesn't have math symbols (+ - / * = > <)
          if (inner.split(' ').length >= 2 && !/[+\/*=><]/.test(inner)) {
            return ''; 
          }
          return match;
        });
        
        // If the correct option is STILL the longest by a massive margin, we could truncate it.
        // But doing so mechanically might break the answer. We will rely on the above heuristics.

        if (cleaned !== opt) changedOptions++;
        return cleaned.trim();
      });
      
      // Let's also balance padding. If the correct answer is > 30 chars, and the others are < 15,
      // we can try to append some plausible padding to the incorrect ones, or just let it be.
      // Actually, removing the explanations usually solves 90% of the length disparity.
    });
  }

  console.log(`Cleaned ${changedOptions} options.`);

  // Serialize MCQ beautifully
  const newMcqStr = JSON.stringify(MCQ, null, 2)
    .replace(/"([^"]+)":/g, (match, p1) => {
      if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p1)) {
        return p1 + ':';
      }
      return match;
    });

  const finalContent = `export const MCQ = ${newMcqStr};\n\nexport const LONG_QA = ${longQaStr};\n`;
  fs.writeFileSync('src/data.js', finalContent);
  console.log('Successfully updated src/data.js');
});
