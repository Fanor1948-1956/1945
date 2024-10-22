const fs = require('fs');
const path = require('path');


function walkDirectory(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      
      if (file !== 'node_modules') {
        walkDirectory(fullPath, callback);
      }
    } else {
      callback(fullPath);
    }
  });
}



function removeCommentsFromFile(file) {
  if (file.endsWith('.js') || file.endsWith('.njk') || file.endsWith('.css')) {
    
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error leyendo el archivo ${file}:`, err);
        return;
      }

      
      const withoutComments = data
        
        .replace(/([^'"]|^)(\/\*[\s\S]*?\*\/)([^'"]|$)/g, '$1$3')
        
        .replace(/([^'"]|^)(\/\/.*)([^'"]|$)/g, '$1$3');

      fs.writeFile(file, withoutComments, 'utf8', (err) => {
        if (err) {
          console.error(`Error escribiendo en el archivo ${file}:`, err);
        } else {
          console.log(`Comentarios eliminados de: ${file}`);
        }
      });
    });
  }
}


const startPath = path.join(__dirname, '..'); 
walkDirectory(startPath, removeCommentsFromFile);
