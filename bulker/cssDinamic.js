// const fs = require('fs')
// const path = require('path')
// const cheerio = require('cheerio')

// // Función para recorrer el directorio
// function walkDirectory (dir, callback) {
//   fs.readdirSync(dir).forEach(file => {
//     const fullPath = path.join(dir, file)
//     if (fs.lstatSync(fullPath).isDirectory()) {
//       if (file !== 'node_modules') {
//         walkDirectory(fullPath, callback)
//       }
//     } else {
//       callback(fullPath)
//     }
//   })
// }

// // Función para añadir el atributo contenteditable
// function addContentEditable (file) {
//   if (file.endsWith('.njk')) {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.error(`Error leyendo el archivo ${file}:`, err)
//         return
//       }

//       const $ = cheerio.load(data) // Cargar el contenido HTML

//       // Agregar contenteditable a todas las etiquetas, si no lo tienen
//       $('*').each((index, element) => {
//         if (!$(element).attr('isEditable')) {
//           $(element).attr('isEditable', 'true') // Añadir el atributo
//         }
//       })

//       // Guardar los cambios en el mismo archivo
//       fs.writeFile(file, $.html(), err => {
//         if (err) {
//           console.error(`Error escribiendo en el archivo ${file}:`, err)
//         } else {
//           console.log(`Atributo contenteditable añadido a: ${file}`)
//         }
//       })
//     })
//   }
// }

// // Ruta de inicio
// const startPath = path.join(__dirname, '..')

// // Recorrer el directorio y añadir el atributo
// walkDirectory(startPath, addContentEditable)

//single archive

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

// Función para recorrer una carpeta específica
function walkSpecificDirectory (dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      // Excluir directorios como 'node_modules' si es necesario
      if (file !== 'node_modules') {
        walkSpecificDirectory(fullPath, callback)
      }
    } else {
      callback(fullPath)
    }
  })
}

// Función para añadir el atributo contenteditable
function addContentEditable (file) {
  if (file.endsWith('.njk')) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error leyendo el archivo ${file}:`, err)
        return
      }

      const $ = cheerio.load(data) // Cargar el contenido HTML

      // Agregar el atributo 'isEditable' a todos los elementos que no lo tengan
      $('*').each((index, element) => {
        if (!$(element).attr('isEditable')) {
          $(element).attr('isEditable', 'true')
        }
      })

      // Guardar los cambios en el mismo archivo
      fs.writeFile(file, $.html(), err => {
        if (err) {
          console.error(`Error escribiendo en el archivo ${file}:`, err)
        } else {
          console.log(`Atributo 'isEditable' añadido a: ${file}`)
        }
      })
    })
  }
}

// Ruta directa a la carpeta específica (sin usar __dirname)
const specificDirectoryPath = 'views/components' // Cambia esto a la ruta absoluta o relativa de tu carpeta

// Recorrer la carpeta específica y añadir el atributo
walkSpecificDirectory(specificDirectoryPath, addContentEditable)

//remove
// const fs = require('fs');
// const path = require('path');
// const cheerio = require('cheerio');

// // Función para recorrer el directorio
// function walkDirectory(dir, callback) {
//   fs.readdirSync(dir).forEach((file) => {
//     const fullPath = path.join(dir, file);
//     if (fs.lstatSync(fullPath).isDirectory()) {
//       if (file !== 'node_modules') {
//         walkDirectory(fullPath, callback);
//       }
//     } else {
//       callback(fullPath);
//     }
//   });
// }

// // Función para eliminar el atributo contenteditable
// function removeContentEditable(file) {
//   if (file.endsWith('.html') || file.endsWith('.njk')) {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.error(`Error leyendo el archivo ${file}:`, err);
//         return;
//       }

//       const $ = cheerio.load(data); // Cargar el contenido HTML

//       // Eliminar el atributo contenteditable de todas las etiquetas
//       $('*').each((index, element) => {
//         $(element).removeAttr('contenteditable'); // Remover el atributo
//       });

//       // Guardar los cambios en el mismo archivo
//       fs.writeFile(file, $.html(), (err) => {
//         if (err) {
//           console.error(`Error escribiendo en el archivo ${file}:`, err);
//         } else {
//           console.log(`Atributo contenteditable eliminado de: ${file}`);
//         }
//       });
//     });
//   }
// }

// // Ruta de inicio
// const startPath = path.join(__dirname, '..');

// // Recorrer el directorio y eliminar el atributo
// walkDirectory(startPath, removeContentEditable);
