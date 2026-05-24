const fs = require('fs');

const appOld = fs.readFileSync('src/App_old.jsx', 'utf8');
const appCurrent = fs.readFileSync('src/App.jsx', 'utf8');

const startMcq = appOld.indexOf('const MCQ = {');
const startLong = appOld.indexOf('const LONG_QA = [');
const endLong = appOld.indexOf('function ProgressBar');

if (startMcq !== -1 && startLong !== -1 && endLong !== -1) {
  const mcqDataStr = appOld.substring(startMcq + 'const MCQ = '.length, startLong).trim();
  const longQaDataStr = appOld.substring(startLong + 'const LONG_QA = '.length, endLong).trim();
  
  const dataJsContent = `export const MCQ = ${mcqDataStr}\n\nexport const LONG_QA = ${longQaDataStr}\n`;
  fs.writeFileSync('src/data.js', dataJsContent);
  console.log('Successfully wrote data.js');
  
  const currentStartMcq = appCurrent.indexOf('const MCQ = {');
  const currentEndLong = appCurrent.indexOf('function ProgressBar');
  if (currentStartMcq !== -1 && currentEndLong !== -1) {
    const before = appCurrent.substring(0, currentStartMcq);
    const after = appCurrent.substring(currentEndLong);
    let newApp = before + after;
    newApp = newApp.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect } from "react";\nimport { MCQ, LONG_QA } from "./data.js";');
    fs.writeFileSync('src/App.jsx', newApp);
    console.log('Successfully updated App.jsx');
  } else {
    console.log('Failed to update App.jsx');
  }
} else {
  console.log('Failed to match indexes', startMcq, startLong, endLong);
}
