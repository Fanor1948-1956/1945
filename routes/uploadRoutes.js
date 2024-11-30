// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer'); // Para manejar la subida de archivos

// Configuración de multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo
  },
});

const upload = multer({ storage });

// Ruta para subir archivos
router.post(
  '/upload-add/:ownerModel/:ownerId/:uploadId?',
  upload.single('file'),
  uploadController.saveOrUpdateUpload
);

// Ruta para obtener uploads por ID de usuario
router.get('/:ownerModel/:ownerId', uploadController.getUploadsByModel);

// Ruta para eliminar un archivo
router.delete(
  '/delete/:uploadId/:ownerModel/:ownerId',
  uploadController.deleteUpload
);
module.exports = router;
