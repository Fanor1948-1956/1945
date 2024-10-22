const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Función para recorrer el directorio
function walkDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDirectory(fullPath);
    } else {
      formatFile(fullPath);
    }
  });
}


function formatFile(file) {
  if (file.endsWith('.js') || file.endsWith('.njk') || file.endsWith('.css')) {
    exec(`npx prettier --write "${file}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al formatear ${file}:`, stderr);
      } else {
        console.log(`Archivo formateado: ${file}`);
      }
    });
  }
}

// Comenzar el proceso desde el directorio actual
const startPath = path.join(__dirname, '..');
walkDirectory(startPath);
