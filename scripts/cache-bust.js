const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read the HTML file
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Generate a hash based on the CSS file content
const cssPath = path.join(__dirname, '../src/output.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const hash = crypto.createHash('md5').update(cssContent).digest('hex').substring(0, 8);

// Update the CSS link with the new hash
htmlContent = htmlContent.replace(
  /href="\.\/output\.css\?v=[^"]*"/,
  `href="./output.css?v=${hash}"`
);

// Write the updated HTML file
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log(`Cache busting updated: output.css?v=${hash}`);