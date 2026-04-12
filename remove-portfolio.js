const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, 'portfolio');

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        removeDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
    console.log(`Removed directory: ${dirPath}`);
  } else {
    console.log(`Directory not found: ${dirPath}`);
  }
}

try {
  removeDirectory(portfolioPath);
  console.log('Cleanup completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error during cleanup:', error);
  process.exit(1);
}
