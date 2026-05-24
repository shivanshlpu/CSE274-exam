import fs from 'fs';
import { execSync } from 'child_process';

console.log('Fetching old file...');
// Execute git cat-file and get raw buffer, then decode as UTF-8
const rawApp = execSync('git cat-file blob b6717bd:Desktop/CSE274/src/App.jsx', { encoding: 'utf8' });

const startMcq = rawApp.indexOf('const MCQ = {');
const startLong = rawApp.indexOf('const LONG_QA = [');
const endLong = rawApp.indexOf('function ProgressBar');

if (startMcq === -1 || startLong === -1 || endLong === -1) {
  console.log('Failed to find boundaries in original file');
  process.exit(1);
}

const mcqDataStr = rawApp.substring(startMcq + 'const MCQ = '.length, startLong).trim();
const longQaDataStr = rawApp.substring(startLong + 'const LONG_QA = '.length, endLong).trim();

// Parse MCQ
let evaled = {};
eval('evaled = ' + mcqDataStr);

let changedOptions = 0;

for (let u in evaled) {
  evaled[u].forEach(q => {
    q.opts = q.opts.map((opt, idx) => {
      let cleaned = opt;
      
      // Remove text after em-dash
      if (cleaned.includes(' — ')) {
        const parts = cleaned.split(' — ');
        if (parts[1] && parts[1].trim().split(' ').length >= 2) {
          cleaned = parts[0].trim();
        }
      }
      
      // Remove text after " - "
      if (cleaned.includes(' - ')) {
        const parts = cleaned.split(' - ');
        if (parts[1] && parts[1].trim().split(' ').length >= 3) {
          cleaned = parts[0].trim();
        }
      }
      
      // Remove parenthetical explanations
      cleaned = cleaned.replace(/\s*\((.*?)\)/g, (match, inner) => {
        const words = inner.trim().split(' ');
        const hasLetters = /[a-zA-Z]/.test(inner);
        const hasMath = /[+\/*=><]/.test(inner);
        // If it looks like an explanation (words, letters, no math)
        if (words.length >= 2 && hasLetters && !hasMath) {
          return ''; 
        }
        return match;
      });
      
      if (cleaned !== opt) changedOptions++;
      return cleaned.trim();
    });
  });
}

console.log(`Cleaned ${changedOptions} options securely.`);

// Serialize MCQ beautifully
const newMcqStr = JSON.stringify(evaled, null, 2)
  .replace(/"([^"]+)":/g, (match, p1) => {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p1)) {
      return p1 + ':';
    }
    return match;
  });

const dataJsContent = `export const MCQ = ${newMcqStr};\n\nexport const LONG_QA = ${longQaDataStr}\n`;
fs.writeFileSync('src/data.js', dataJsContent);
console.log('Successfully wrote src/data.js');
