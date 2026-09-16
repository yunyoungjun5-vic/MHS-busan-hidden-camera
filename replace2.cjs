const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/부산성범죄심리상담센터/g, '부산성범죄심리상담치료센터');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

const files = [
  'src/App.tsx',
  'src/pages/MediaAppearancePage.tsx',
  'src/pages/PartnersPage.tsx',
  'src/components/PartnerTeaser.tsx',
  'src/constants/partners.ts',
  'metadata.json'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    replaceInFile(fullPath);
    console.log(`Replaced in ${file}`);
  }
});
